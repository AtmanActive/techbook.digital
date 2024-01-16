import React, { useState, useEffect } from 'react';

interface FilterTags {
    tags: string[];
    onTagsChange: (selectedTags: string[]) => void;
}

const FilterTags: React.FC<FilterTags> = ({ tags, onTagsChange }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleCheckboxChange = (tag: string) => {
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tag)) {
                return prevSelectedTags.filter(t => t !== tag);
            } else {
                return [...prevSelectedTags, tag];
            }
        });
    };

    const clearTags = () => {
        setSelectedTags([]);
    };

    useEffect(() => {
        onTagsChange(selectedTags);
    }, [selectedTags, onTagsChange]);

    const sortTags = [...tags].sort((a, b) => a.localeCompare(b));

    return (
        <div className="max-w-screen-sm mx-auto mt-10">
            {selectedTags.length > 0 && (
                <button type="button" className="text-xs font-normal text-center text-gray-500"
                    onClick={clearTags}>Clear tags</button>
            )}
            <ul className="items-center w-full bg-white rounded-lg sm:flex">
                {sortTags.map(tag => (
                    <li key={tag} className="w-full">
                        <div className="flex items-center ps-3">
                            <input type="checkbox"
                                id={`tag-${tag}`}
                                name={`tag-${tag}`}
                                value={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleCheckboxChange(tag)}
                                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-gray-900" />
                            <label htmlFor={`tag-${tag}`} className="w-full py-3 ms-2 text-sm font-normal text-gray-900">
                                {tag}
                            </label>
                        </div>
                    </li>
                ))
                }
            </ul>
        </div >
    );
};

export default FilterTags;
