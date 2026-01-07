const Footer = () => {

  // Just contains cardboard cutouts of different buttons
  return (
    <div className={"w-full h-0.5 bg-gray-200 mt-10"}>
      <div className={"w-full h-12 flex flex-row gap-3 items-center justify-center"}>
        <div className={""}>EUR €</div>
        <div className={""}>CONTACT</div>
        <div className={""}>TERMS OF SERVICE</div>
        <div className={""}>PRIVACY POLICY</div>
        <div className={""}>RETURNS & FAQ</div>
        <img
          src={"https://media1.tenor.com/m/NRVHnuQBT-EAAAAd/seal-clap.gif"}
          className={"w-10 h-10"}
          alt={"seal"}
        />
      </div>
    </div>
  )
}

export default Footer