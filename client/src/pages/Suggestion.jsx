import React, { useEffect, useState } from 'react'
import '../styles/suggestion.css'
import { AiFillCaretDown } from 'react-icons/ai';

const Suggestion = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [vastuDropdownVisible, setVastuDropdownVisible] = useState(false);
    const [option, setOption] = useState("");

    const handleDropdownClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleVastuDropdownClick = () => {
        setVastuDropdownVisible(!vastuDropdownVisible);
    };

    const handleOutsideClick = (event) => {
        if (
            event.target.closest(".room-types-dropdown") === null &&
            event.target.closest(".vastu-dropdown") === null
        ) {
            setDropdownVisible(false);
            setVastuDropdownVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <h2 className='my-5 px-5'>Color Suggestions</h2>
            <div className="navbar my-5 px-5">
                <div className="dropdown">
                    <button className="dropbtn room-types-dropdown" onClick={handleDropdownClick}>
                        Room Types <span className='inline-block'><AiFillCaretDown /></span>
                    </button>
                    <div
                        className={`dropdown-content ${dropdownVisible ? "show" : ""}`}
                        onClick={handleOutsideClick}
                    >
                        <div className="dropdown-item" onClick={() => setOption("Living Room")}>Living room</div>
                        <div className="dropdown-item" onClick={() => setOption("Dining Room")}>Dining room</div>
                        <div className="dropdown-item" onClick={() => setOption("Home Office")}>Home office</div>
                        <div className="dropdown-item" onClick={() => setOption("Study Room")}>Study room</div>
                        <div className="dropdown-item" onClick={() => setOption("Children Room")}>Children room</div>
                        <div className="dropdown-item" onClick={() => setOption("Guest Room")}>Guest room</div>
                        <div className="dropdown-item" onClick={() => setOption("Bedroom")}>Bedroom</div>
                        <div className="dropdown-item" onClick={() => setOption("Kitchen")}>Kitchen</div>
                        <div className="dropdown-item" onClick={() => setOption("Bathroom")}>Bathroom</div>
                        <div className="dropdown-item" onClick={() => setOption("Puja Room")}>Puja room</div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn vastu-dropdown" onClick={handleVastuDropdownClick}>
                        Vastu <span className='inline-block'><AiFillCaretDown /></span>
                    </button>
                    <div
                        className={`dropdown-content ${vastuDropdownVisible ? "show" : ""}`}
                        onClick={handleOutsideClick}
                    >
                        <div className="dropdown-item" onClick={() => setOption("North")}>North</div>
                        <div className="dropdown-item" onClick={() => setOption("Northeast")}>North-East</div>
                        <div className="dropdown-item" onClick={() => setOption("Northwest")}>North-West</div>
                        <div className="dropdown-item" onClick={() => setOption("South")}>South</div>
                        <div className="dropdown-item" onClick={() => setOption("Southeast")}>South-East</div>
                        <div className="dropdown-item" onClick={() => setOption("Southwest")}>South-West</div>
                        <div className="dropdown-item" onClick={() => setOption("East")}>East</div>
                        <div className="dropdown-item" onClick={() => setOption("West")}>West</div>
                    </div>
                </div>
            </div>
            {option === "Living Room" && (
                <div className="mx-5 my-5">
                    <p className="text-lg">The living room is one of the most important areas of a home, as one tends to spend most of the time here, with family members. It is also the place where homeowners entertain guests.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">White</li>
                        <li className="text-gray-700">Brown</li>
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">White</li>
                    </ul>
                </div>
            )}
            {option === "Dining Room" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">If you want your dining room to look compact and cosy but full of energy, you can pick warmer tones of red and yellow. If you want to make the room look bigger, opt for brighter tones of green, yellow or purple colours for the dining room / color for home and perk it up with drapes in complementing colours. You can also use metallic wallpaper, to add some glam to the room.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Red</li>
                        <li className="text-gray-700">Yellow</li>
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">Purple</li>
                    </ul>
                </div>
            )}
            {option === "Home Office" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">When going about colour selection for home, shades of grey are excellent wall colours for designing a home office. Darker shades work best for accent walls while deep blue provides a great backdrop for computers.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">Blue</li>
                    </ul>
                </div>
            )}
            {option === "Study Room" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">While red is the perfect colour for improving focus and concentration, you can also experiment with different shades of green, deep greys or silver, as these shades are said to improve creativity and help in focusing.
                    Orange and yellow are other preferred colours for the study room, as it increases alertness and make for excellent choices when it comes to color selection for home.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">Orange</li>
                        <li className="text-gray-700">Yellow</li>
                    </ul>
                </div>
            )}
            {option === "Children Room" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Pale pink, baby blue or softer tones of yellow, are the most popular colours for childrens rooms. Since these are soothing hues, they will have a calming effect on your child. Also, if you want to pick some unusual colours for the room, make sure you select a brighter shade, to add some enthusiasm.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Pink</li>
                        <li className="text-gray-700">Blue</li>
                        <li className="text-gray-700">Yellow</li>
                    </ul>
                </div>
            )}
            {option === "Guest Room" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">You can pick a combination of colours for decorating your guest room, such as color for home like chocolate brown colour is a perfect selection for your guest room, to make it look cosy and comfortable. You can complement it with solid wood furniture, to make your guests feel welcome.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Brown</li>
                    </ul>
                </div>
            )}
            {option === "Bedroom" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Best colours for bedroom walls in India are lavender, soft green, pale blue, soft grey and deep blue. You can also pick lighter tones of these colours or alternatively, you can select cream or white colour for your bedroom.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">Blue</li>
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">White</li>
                    </ul>
                </div>
            )}
            {option === "Kitchen" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Ideal colours for the kitchen during color selection for home include white, grey, yellow and green. These colours will make your kitchen appear bright. Warmer tones stimulate the appetite. So, you can select hot chilli or orange colour, to make your kitchen a foodies haven.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">Yellow</li>
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">White</li>
                        <li className="text-gray-700">Orange</li>
                    </ul>
                </div>
            )}
            {option === "Bathroom" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Use any cooler tones of blue, green, or creamy white, to paint your bathroom into a relaxing zone of your home. Grey and pure white are other options, if you do not want to experiment with your color selection for home.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">Blue</li>
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">White</li>
                    </ul>
                </div>
            )}
            {option === "Puja Room" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Paint the puja room to make it a peaceful and calming space while choosing colours for home. Use white, lavender, brown, light yellow or pale green colours for the wall. Opt for dual colours in the puja room. For this, you can add a touch of gold or red with cream colour on the wall. Red and gold are considered auspicious for the puja room.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Green</li>
                        <li className="text-gray-700">Brown</li>
                        <li className="text-gray-700">Yellow</li>
                        <li className="text-gray-700">Red</li>
                        <li className="text-gray-700">White</li>
                    </ul>
                </div>
            )}
            {option === "North" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Green is the best color for a north facing wall as this direction is governed by planet mercury.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Green</li>
                    </ul>
                </div>
            )}
            {option === "Northeast" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">The suitable color for a wall in the northeast direction is yellow as this direction is ruled by planet Jupiter.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Blue</li>
                        <li className="text-gray-700">Yellow</li>
                    </ul>
                </div>
            )}
            {option === "Northwest" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">The suitable color for a wall in the northwest direction is Light grey, white, cream.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Gray</li>
                        <li className="text-gray-700">White</li>
                    </ul>
                </div>
            )}
            {option === "South" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">The best wall color for a south facing wall is red or orange as this direction is ruled by planet Mars.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Red</li>
                        <li className="text-gray-700">Orange</li>
                        <li className="text-gray-700">Yellow</li>
                    </ul>
                </div>
            )}
            {option === "Southeast" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">Red is the best color for a southeast facing wall.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Red</li>
                        <li className="text-gray-700">Orange</li>
                        <li className="text-gray-700">Pink</li>
                    </ul>
                </div>
            )}
            {option === "Southwest" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">The suitable color for a wall in the southwest direction is Peach, mud color or light brown</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Brown</li>
                    </ul>
                </div>
            )}
            {option === "West" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">The perfect color for a west facing color in your home is gray as this direction is ruled by planet Saturn.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Blue</li>
                        <li className="text-gray-700">White</li>
                        <li className="text-gray-700">Gray</li>
                    </ul>
                </div>
            )}
            {option === "East" && (
                <div className="mx-5 my-5" >
                    <p className="text-lg">The most preferred color for an east facing wall is orange as this direction is ruled by the Sun.</p>
                    <ul className="list-disc pl-5 mt-3">
                        <li className="text-gray-700">Blue</li>
                        <li className="text-gray-700">White</li>
                        <li className="text-gray-700">Orange</li>
                    </ul>
                </div>
            )}

            {/* <ul>
                    <li>
                    </div></li>
                <li>Based on Sunlight</li>
                <li>
                    Based on Vastu
                    <ol>
                        <li>Room Type</li>
                        <li>Direction</li>
                    </ol>
                </li>
            </ul> */}
        </div>
    )
}

export default Suggestion