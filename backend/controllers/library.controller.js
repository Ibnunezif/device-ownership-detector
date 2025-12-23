import Library from "../Models/library.model.js";

// POST api/libraries/create
// body: { name, location }
const createLibrary = async (req, res) => {
  try {
    const { name, location } = req.body;
    const userId = req.user?._id;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user missing" });
    }

    if (!name || !location) {
      return res
        .status(400)
        .json({ success: false, message: "Name and location are required" });
    }

    const existingLibrary = await Library.findOne({ name, location });
    if (existingLibrary) {
      return res
        .status(400)
        .json({ success: false, message: "Library already exists" });
    }

    const library = await Library.create({
      name,
      location,
      created_by_user_id: userId,
    });
    return res.status(201).json({ success: true, library });
  } catch (error) {
    console.error("Failed to create library", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create library",
      error: error.message,
    });
  }
};

// GET api/libraries/all
// No body
const getLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();

    if (libraries.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No libraries found" });
    }

    return res.json({ success: true, libraries });
  } catch (error) {
    console.error("Failed to fetch libraries", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch libraries",
      error: error.message,
    });
  }
};

// PUT api/libraries/update/:id
// body: { name, location }
// params: { id }
const updateLibrary = async (req, res) => {
  try {
    const { name, location } = req.body;
    const libraryId = req.params.id;

    const existingLibrary = await Library.findById(libraryId);
    if (!existingLibrary) {
      return res
        .status(404)
        .json({ success: false, message: "Library not found" });
    }

    const library = await Library.findByIdAndUpdate(
      libraryId,
      { name, location },
      { new: true }
    );
    return res.json({
      success: true,
      message: "Library updated successfully",
      library,
    });
  } catch (error) {
    console.error("Failed to update library", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update library",
      error: error.message,
    });
  }
};

// DELETE api/libraries/delete/:id
// params: { id }
const deleteLibrary = async (req, res) => {
  try {
    const libraryId = req.params.id;

    const existingLibrary = await Library.findById(libraryId);
    if (!existingLibrary) {
      return res
        .status(404)
        .json({ success: false, message: "Library not found" });
    }

    await Library.findByIdAndDelete(libraryId);
    return res.json({ success: true, message: "Library deleted successfully" });
  } catch (error) {
    console.error("Failed to delete library", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete library",
      error: error.message,
    });
  }
};

export { createLibrary, getLibraries, updateLibrary, deleteLibrary };
