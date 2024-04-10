import { Venue, VenueRating } from "@/pages/api/venues"

type VenueDetailsProps = {
    venue: Venue
    onClose: () => void
}

type RatingBarProps = { ratingCategory: string, ratingValue: number }
const RatingBar = ({ ratingCategory, ratingValue }: RatingBarProps) => {
    return (
    <dd className="flex flex-col mb-2" data-cy={`rating-${ratingCategory}`}>
        <div className="text-[11px] font-medium text-slate-800">{ratingCategory} ({ratingValue}/5)</div>
        <div className="bg-slate-200 rounded-md h-2.5">
            <div className="bg-yellow-400 h-2.5 rounded-md" data-cy="bar" style={{"width" : `${(ratingValue/5)*100}%`}}></div>
        </div>
    </dd>
)}

const VenueDetails: React.FC<VenueDetailsProps> = ({ venue, onClose }) => {
    return (
        <div className="absolute top-3 left-3 w-[300px] bg-white z-10 rounded-md shadow-md" data-cy="venue-details">
            <div className="h-44 bg-cover bg-center rounded-t-md relative" style={{ backgroundImage: `url('${venue.thumbnailUri}')` }} data-cy="image">
                <div className="absolute top-1 right-1 p-1 bg-white rounded-full cursor-pointer" onClick={onClose} data-cy="close-link">
                    <svg className="w-7 h-7 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div className="p-2">
                <h2 className="font-semibold text-xl/none text-blue-950" data-cy="name">{venue.name}</h2>
                <div className="text-slate-400 text-[12px]" data-cy="address">{venue.location.address}</div>
                <div className="text-slate-500 text-xs mt-3 mb-3" data-cy="description">{venue.description}</div>

                <div className="mb-3">
                    <RatingBar ratingCategory="Beer" ratingValue={venue.rating.beer} />
                    <RatingBar ratingCategory="Atmosphere" ratingValue={venue.rating.atmosphere} />
                    <RatingBar ratingCategory="Amenities" ratingValue={venue.rating.amenities} />
                    <RatingBar ratingCategory="Value" ratingValue={venue.rating.value} />
                </div>

                <div className="flex justify-evenly mb-1">
                    {venue.contact.phone && <a href={`tel:${venue.contact.phone}`} data-cy="phone-link"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    </a>}
                    {venue.contact.twitterUri && <a href={venue.contact.twitterUri} data-cy="twitter-link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-twitter-x w-4 h-4" viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                        </svg>
                    </a>}
                </div>
            </div>
        </div>
  )
}
export default VenueDetails
