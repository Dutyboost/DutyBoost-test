import React from 'react';
import { Link } from 'react-router-dom';

const UserNotRegisteredError = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Account Not Found</h2>
          <p className="text-slate-600 leading-relaxed">
            The email address you used is not registered on DutyBoost. You need to create an account before you can sign in.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800 text-left">
            <p className="font-semibold mb-1">What you can do:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Sign up as a <strong>Travel Agency</strong> or <strong>Airport Retailer</strong></li>
              <li>Make sure you're using the correct email address</li>
              <li>Contact <a href="mailto:hello@dutyboost.com" className="underline font-medium">hello@dutyboost.com</a> if you need help</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/get-started"
              className="flex-1 bg-primary text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors text-center"
            >
              Create an Account
            </Link>
            <a
              href="/"
              className="flex-1 border border-slate-200 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;