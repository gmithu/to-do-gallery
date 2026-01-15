import React, { useState, useEffect } from 'react'

export default function Gallery() {



  const [allImages, setAllImages] = useState<string[]>(["defender.avif", "ninja.avif", "jeep-wrangler1_360x240.avif, ducati.avif, flight1.avif, flight2.avif"]);
  const [images, setImages] = useState<string[]>(["defender.avif", "ninja.avif", "jeep-wrangler1_360x240.avif, ducati.avif, flight1.jpeg, flight2.jpg"]);
  

  const [inputValue, setInputValue] = useState<string>("");

  const [searchInput, setsearchInput] = useState<string>("")

  const [Cars, setCars] = useState<string[]>(["defender.avif", "jeep-wrangler1_360x240.avif"]);
  const [Flights, setFlights] = useState<string[]>(["flight1.jpeg", "flight2.jpg"]);
  const [Bikes, setBikes] = useState<string[]>(["ninja.avif", "ducati.avif"]);


  useEffect(() => {
    const StroreData = localStorage.getItem("galleryImages");
    if (StroreData) {
      setAllImages(JSON.parse(StroreData));
      setImages(JSON.parse(StroreData));
    }
  }, []);




  function handleAddImage() {
    if (inputValue.trim() !== "") {
      const newImage = [...allImages, inputValue.trim()];
      setAllImages(newImage);
      setImages(newImage);
      localStorage.setItem("galleryImages", JSON.stringify(newImage));
      setInputValue("");
    } else {
      alert("Please enter a valid image name or URL.");
    }
  }



  function handleSearchImage() {
    if (searchInput.trim() !== "") {
      const filteredImages = allImages.filter(prev =>
        prev.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
      setImages(filteredImages);
      setsearchInput("");
    } else {
      alert("Please enter a valid search term.");
    }
  }

  function cliickCar() {
    if (Cars) {
      setImages(Cars);
    }

  }
  function cliCkBike() {
    if (Bikes) {
      setImages(Bikes);
    }

  }
  function cliCkFlight() {
    if (Flights) {
      setImages(Flights);
    }
  }

  function handleRemoveImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setAllImages(newImages);
    localStorage.setItem("galleryImages", JSON.stringify(newImages));
  }


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <div className="flex shadow-2xl rounded-3xl overflow-hidden border border-gray-200 bg-white max-w-6xl w-full min-h-[700px]">

        <aside className="flex flex-col items-center gap-8 py-10 px-6 bg-gradient-to-b from-blue-200 to-blue-50 w-64 border-r border-gray-200">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 tracking-wide">All Gallery</h1>
          <button className="w-full py-2 rounded-lg text-lg font-medium text-gray-700 hover:bg-blue-100 transition" onClick={cliickCar}>Cars</button>
          <button className="w-full py-2 rounded-lg text-lg font-medium text-gray-700 hover:bg-blue-100 transition" onClick={cliCkFlight}>Flights</button>
          <button className="w-full py-2 rounded-lg text-lg font-medium text-gray-700 hover:bg-blue-100 transition" onClick={cliCkBike}>Bikes</button>
        </aside>


        <main className="flex-1 flex flex-col">

          <div className="flex items-center gap-4 px-10 py-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              placeholder="Search images..."
              onChange={(e) => setsearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition" onClick={handleSearchImage}>Enter</button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow transition ml-2 flex items-center justify-center"
              onClick={() => {
                setImages(allImages);
                setsearchInput("");
              }}
              aria-label="Refresh"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 0115.364-6.364L21 8M21 3v5h-5M21 12a9 9 0 01-15.364 6.364L3 16m0 5v-5h5" className='text-green-500' />
              </svg>

            </button>
          </div>

          <div className="grid grid-cols-3 gap-10 p-10 place-items-center">

            <div className="bg-white rounded-xl shadow-lg  hover:scale-105 w-64 gap-4 h-56 border border-gray-100 flex flex-col items-center justify-center" >
              <div className=" object-cover font-bold">add images</div>
              <input
                type="text"
                className='border px-2 py-1 rounded'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Image name or URL"
              />
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                onClick={handleAddImage}
              >Add</button>

            </div>


            {
              images.map((value, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col items-center justify-center w-64 h-56" >
                  <button className='w-60  flex justify-end p-2 h-5 items-center text-red-500' onClick={() => handleRemoveImage(index)}>x</button>
                  {value.match(/\.(jpeg|jpg|gif|png|avif)$/i) ? (
                    <img src={value} alt={value} className="w-72 h-48 object-cover" />
                  ) : (
                    <div className="p-4 text-center text-gray-700 font-medium">{value}</div>
                  )}
                </div>
              ))
            }
          </div>
        </main>
      </div>
    </div>
  );
}
