import React, { useEffect, useState } from 'react';
import { getJson } from '../api';

// Customer reviews added from the dashboard: DM / story screenshots. Image only -
// no name, rating or text shown here.
export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getJson('/reviews?limit=12')
      .then((data) => !cancelled && setReviews(data.reviews))
      .catch(() => {}); // the section just stays hidden if the API is down
    return () => {
      cancelled = true;
    };
  }, []);

  const withImages = reviews.filter((review) => review.image?.url);

  if (!withImages.length) return null;

  return (
    <section className="bg-white py-12 md:py-16 text-[#111111] border-t border-[#EAE6DF]">
      <h2 className="text-center text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-8 md:mb-10 px-4">
        Customer Reviews
      </h2>

      {/* Scrolls sideways on small screens, centred when everything fits */}
      <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 md:gap-5 mx-auto">
          {withImages.map((review) => (
            <figure
              key={review._id}
              className="snap-center shrink-0 w-[70vw] sm:w-[300px] md:w-[340px] bg-[#FCFCFB] border border-[#EAE6DF] overflow-hidden"
            >
              <img
                src={review.image.url}
                alt="Customer review"
                loading="lazy"
                className="w-full aspect-[9/16] object-cover bg-[#F3F1EC]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
