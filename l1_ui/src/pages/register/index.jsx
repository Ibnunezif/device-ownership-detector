import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register - PC Owner Detector</title>
        <meta name="description" content="Create your PC Owner Detector account to register and protect your devices with institutional security" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="order-2 lg:order-1">
                <div className="lg:sticky lg:top-8 space-y-6">
                  <div className="lg:hidden">
                    <RegistrationHeader />
                  </div>
                  <SecurityFeatures />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-card border border-border rounded-xl shadow-elevation-lg p-6 md:p-8">
                  <div className="hidden lg:block">
                    <RegistrationHeader />
                  </div>
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-border mt-12 md:mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                &copy; {new Date()?.getFullYear()} PC Owner Detector. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 md:space-x-6">
                <button className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Help Center
                </button>
                <button className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Contact Support
                </button>
                <button className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  System Status
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;