import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function SearchResult() {
    return (
        <>
            <div className="flex justify-between">
                <div>
                    <div className="font-semibold text-xl">Brewdog</div>
                    <div className="text-md">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
                </div>
                <div className="w-8 flex justify-center">
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-9/12 h-px bg-gray-200"></div>
            </div>
        </>
  )
}