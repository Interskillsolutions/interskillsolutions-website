const VisionMission = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Vision & Mission</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To be a global leader in skill development, empowering individuals with cutting-edge technology training and fostering a culture of continuous learning and innovation.
                        </p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-600">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To bridge the gap between academia and industry by providing high-quality, practical training. We aim to nurture talent, enhance employability, and contribute to the growth of the technology ecosystem.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;
