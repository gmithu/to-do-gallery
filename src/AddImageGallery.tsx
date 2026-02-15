import React, { useEffect, useState } from 'react'
import AppButton from './components/AppButton'
import Input from './components/Input';


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
                <div className='w-full'>
                    <Input
                        variant="search"
                        placeholder="Search image title or URL..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

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
                                        <AppButton
                                            variant="icon"
                                            pos="card"
                                            title="Remove image"
                                            onClick={() => handleRemoveImage(image.id)}
                                        >
                                            ×
                                        </AppButton>
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
                    <AppButton
                        variant="fab"
                        title="Add image"
                        onClick={() => setSelect(true)}
                    >
                        +
                    </AppButton>
                </div>
            </div>

            {select && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-white to-slate-100 p-8 rounded-3xl shadow-2xl w-full max-w-md relative animate-fade-in">

                        <AppButton
                            variant="icon"
                            pos="modal"
                            onClick={() => setSelect(false)}
                            title="Close"
                        >
                            x
                        </AppButton>

                        <h3 className="text-2xl font-extrabold mb-6 text-slate-700 text-center tracking-wide">Image Details</h3>
                        <div className="flex flex-col gap-6">
                            <Input
                                variant='search'
                                label="Image Title"
                                onChange={(e) => setImageTitle(e.target.value)}
                                value={imageTitle}
                            />
                            <Input
                                variant='search'
                                label="Image URL"
                                onChange={(e) => setImageURL(e.target.value)}
                                value={imageURL}
                            />
                            <AppButton
                                variant="primary"
                                onClick={handleSaveImage}
                            >
                                Save Image
                            </AppButton>
                        </div>
                    </div>
                </div>
            )}


            {ViewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-3xl w-full relative animate-fade-in">
                        <AppButton
                            variant="icon"
                            pos="view"
                            title="Close"
                            onClick={() => setViewImage(false)}
                        >
                            x
                        </AppButton>
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
