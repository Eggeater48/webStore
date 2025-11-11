import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

// TODO this needs a lot more work. its really scuffed at the momeent
const Wishlist = ({ reviewAverage }) => {
  const state = useLocation()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector(state => state.user)

  return (
    <div>
      <img src={"https://media.gettyimages.com/id/1345384816/photo/construction-industry-and-engineering-in-post-recession-period.jpg?s=612x612&w=gi&k=20&c=n6pDehF0Iwfk655d6q4W8rTEBik3TVa2LCMdDJbbEug="} alt={"työmää"} />
      <div className={"bg-red-500 text-purple-700"}>Työmää!! Ts is really unfinished!!!</div>

      {user.wishlist.length !== 0 ?
        <div>
          {user.wishlist.map(productData =>
            <div className={"grid grid-cols-3 outline-neutral-500 outline-solid outline-1 w-160 h-52 mt-24 "}>

              <div className={""} onClick={() => {navigate(`/${productData.id}`)}}>
                <img
                  src={productData.images[0]}
                  alt={""}
                  className={"outline-neutral-500 outline-solid outline-1 h-3/4 w-full overflow-hidden top-1/8 relative"} />
              </div>

              <div className={"outline-neutral-500 outline-solid outline-1 h-3/4 overflow-hidden"}>
                <div className={"flex flex-col"}>
                  <div className={""}>{productData.title}</div>
                  <div className={"flex flex-row gap-2"}>
                    <div>Reviews</div>
                    <div>{reviewAverage(productData)}</div>
                  </div>

                  <div className={"flex flex-row gap-2"}>
                    <div>Added on</div>
                    <div>{Date.now().toLocaleString()}</div>
                  </div>
                </div>

                <div className={"flex flex-row gap-2 outline-neutral-800 text-center"}>
                  {productData.tags.map(tag =>
                    <div className={"outline-1 outline-solid rounded-md"}>
                      {tag}
                    </div>
                  )}
                </div>

              </div>

              <div className={"outline-neutral-800 outline-solid outline-1 overflow-hidden"}>

                <div className={"ml-4 h-12 w-3/4 mt-26 flex-row flex gap-4"}>
                  <div className={""}>
                    €{productData.price}
                  </div>

                  <button className={""}>
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
        :
        <div className={"text-center mt-10"}>
          Your wishlist is empty.
        </div>
      }

    </div>

  )
}

export default Wishlist