'use client';
import React from 'react';
import { FiMusic, FiClock} from 'react-icons/fi';

const ComingSoon = () => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12 px-4">
            <div className="bg-gradient-to-br from-clay-court/20 to-clay-court/10 rounded-2xl p-8 border border-clay-dust/20 backdrop-blur-sm">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 bg-clay-cream/10 rounded-full flex items-center justify-center">
                                <FiMusic className="w-8 h-8 text-clay-cream" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <FiClock className="w-3 h-3 text-clay-court" />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-clay-cream mb-4">
                        More Features Coming Soon!
                    </h2>

                    <p className="text-clay-dust text-lg mb-8 max-w-xl mx-auto">
                        I'm working on some exciting new features
                    </p>

                    <div className="flex justify-center">
                        <div className="inline-flex items-center space-x-2 text-clay-dust">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">Updates coming soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;