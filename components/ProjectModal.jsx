import React from 'react';
import {motion} from "framer-motion";
const ProjectModal = ({ selected, setSelected }) => {
    if (!selected) {
        return <></>;
    }
    // selected = 1;
    return (
        <div
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/50 z-50 cursor-pointer overflow-y-scroll"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full h-screen flex items-center justify-center max-w-[700px] m-auto my-8 px-8 cursor-default"
            >
                <div className="bg-white max-w-[1440px] h-auto">
                    <motion.div slayoutId={`card-${selected.id}`}>
                        <img src="/profile.JPG" alt={"projectPic"} />
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default ProjectModal;