import React, { useEffect, useState } from 'react'


type GalleryImage = {
    id: number;
    title: string;
    url: string;
}

export default function AddImageGallery() {

    const [select, setSelect] = useState<boolean>(false)
    const [gallery, setGallery] = useState<GalleryImage[]>([])
    const [nextId, setNextId] = useState<number>(1)
    const [imageTitle, setImageTitle] = useState<string>("")
    const [imageURL, setImageURL] = useState<string>("")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [ViewImage, setViewImage] = useState<boolean>(false)
    const [viewImageUrl, setViewImageUrl] = useState<string>("")

    useEffect(() => {

        const storedGallery = localStorage.getItem('imageGallery');
        if (storedGallery) {
            const parsed = JSON.parse(storedGallery) as GalleryImage[];
            setGallery(parsed);
            const maxId = parsed.reduce((max, img) => Math.max(max, img.id ?? 0), 0);
            setNextId(maxId + 1);
        }


    }, []);


    function handleSaveImage() {
        if (imageTitle && imageURL) {
            const newImage: GalleryImage = { id: nextId, title: imageTitle, url: imageURL };
            setGallery(prevGallery => {
                const updatedGallery = [...prevGallery, newImage];
                localStorage.setItem('imageGallery', JSON.stringify(updatedGallery));
                return updatedGallery;
            });
            setNextId(prev => prev + 1);
            setImageTitle("");
            setImageURL("");
            setSelect(false);

        }
    }



    function handleRemoveImage(id: number) {
        const updatedGallery = gallery.filter(img => img.id !== id);
        setGallery(updatedGallery);
        localStorage.setItem('imageGallery', JSON.stringify(updatedGallery));
    }



    const filteredGallery = gallery.filter(
        image =>
            image.title.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            image.url.toLowerCase().startsWith(searchTerm.toLowerCase())
    );



    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300">
            <div className="flex flex-col items-center w-10/12 h-[860px]  border border-gray-300 rounded-2xl shadow-lg bg-white gap-7 p-3">
                <h2 className="text-2xl font-bold  text-slate-700">Add Image to Gallery</h2>
                <input
                    type="text"
                    placeholder="Search image title or URL..."
                    className="w-10/12 h-12 border border-slate-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-slate-400 focus:outline-none transition-all duration-200 shadow-sm bg-slate-50 mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className='border h-3/4 w-10/12 overflow-y-auto p-4 rounded-lg bg-slate-50 shadow-inner gap-4'>
                    {gallery.length === 0 && searchTerm.trim() === '' ? (

                        <div className="flex flex-col items-center justify-center h-full text-slate-500">

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2.5 3.01L14 11l4 5" />
                            </svg>

                            <div className="text-lg font-semibold">No images in gallery</div>
                            <div className="text-sm text-slate-400">Click the + button to add your first image.</div>

                        </div>
                        
                    ) : filteredGallery.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            <div className="text-lg">No results found</div>
                        </div>
                    ) : (
                        <ul className='flex flex-wrap gap-4'>
                            {filteredGallery.map((image) => (
                                <li key={image.id} className="mb-4">
                                    <div className="relative bg-gradient-to-br from-slate-50 to-slate-200 border justify-center border-slate-200 rounded-2xl p-3 shadow-lg flex flex-col items-center gap-5 h-96 w-96  group transition-all duration-300 hover:shadow-2xl">
                                        <button
                                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-slate-400 hover:text-red-500 hover:bg-red-100 transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-red-300/40 text-xl font-bold z-10"
                                            title="Remove image"
                                            onClick={() => handleRemoveImage(image.id)}
                                        >
                                            ×
                                        </button>
                                        <img
                                            src={image.url}
                                            alt={image.title}
                                            className="w-72 h-48 object-cover rounded-xl shadow-md border border-slate-100 group-hover:scale-105 transition-transform duration-300 bg-slate-100"
                                            onError={e => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image')}
                                            onClick={() => {
                                                setViewImageUrl(image.url);
                                                setViewImage(true);
                                            }}
                                        />
                                        <div className="text-base font-semibold text-slate-700 text-center truncate w-full px-2" title={image.title}>{image.title}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='h-10 justify-end  items-end flex w-11/12 '>
                    <button
                        className="w-16 h-16 rounded-full  flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white text-3xl font-bold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        title="Add image"
                        onClick={() => setSelect(true)}
                    >
                        +
                    </button>
                </div>
            </div>

            {select && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-white to-slate-100 p-8 rounded-3xl shadow-2xl w-full max-w-md relative animate-fade-in">
                        <button
                            onClick={() => setSelect(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-2xl font-bold transition-colors duration-200 focus:outline-none"
                            title="Close"
                        >
                            x
                        </button>
                        <h3 className="text-2xl font-extrabold mb-6 text-slate-700 text-center tracking-wide">Image Details</h3>
                        <div className="flex flex-col gap-6">
                            <input
                                type="text"
                                placeholder="Image Title"
                                className="border border-slate-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-slate-400 focus:outline-none transition-all duration-200 shadow-sm bg-slate-50"
                                value={imageTitle}
                                onChange={(e) => setImageTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="border border-slate-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-slate-400 focus:outline-none transition-all duration-200 shadow-sm bg-slate-50"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                            <button
                                className="mt-2 bg-slate-700 hover:bg-slate-900 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 text-lg"
                                onClick={handleSaveImage}
                            >
                                Save Image
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {ViewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-3xl w-full relative animate-fade-in">
                        <button
                            className="absolute top-4 right-2 text-slate-400 hover:text-red-500 text-2xl font-bold transition-colors duration-200 focus:outline-none"
                            title="Close"
                            onClick={() => setViewImage(false)}
                        >
                            x
                        </button>
                        <img
                            src={viewImageUrl}
                            alt="View"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-md bg-slate-100"
                            onError={e => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image')}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
