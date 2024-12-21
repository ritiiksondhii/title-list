import React from 'react';

type BookDetailProps = {
  title: string;
  author: string;
  description: string;
  releaseDate: string;
  price: {
    us: string;
    canada: string;
    uk: string;
  };
  ageRange: string;
  categories: string[];
  pageCount: number;
  imageUrl?: string;
};

const BookDetailCard: React.FC<BookDetailProps> = ({
  title,
  author,
  description,
  releaseDate,
  price,
  ageRange,
  categories,
  pageCount,
  imageUrl,
}) => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <h3 className="text-lg text-gray-600 mb-4">by {author}</h3>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="text-sm text-gray-600 mb-4">
          <p><strong>Release Date:</strong> {releaseDate}</p>
          <p><strong>Age Range:</strong> {ageRange}</p>
          <p><strong>Page Count:</strong> {pageCount}</p>
        </div>

        <div className="mb-4">
          <strong>Categories:</strong>
          <ul className="list-disc list-inside text-gray-700">
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-700">
          <p><strong>Price:</strong></p>
          <ul>
            <li>US: {price.us}</li>
            <li>Canada: {price.canada}</li>
            <li>UK: {price.uk}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetailCard;