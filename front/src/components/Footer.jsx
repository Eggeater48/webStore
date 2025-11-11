const Footer = () => {
  // TODO also make this little bastard actually be positioned well
  // TODO check my grammar cuz its kinda ass
  // TODO mby switch out the divs for actual buttons and not just leave them as cardboard cutouts
  return (
    <div className={"w-full h-0.5 bg-gray-200 mt-10"}>
      <div className={"w-full h-12 flex flex-row gap-3 items-center justify-center"}>
        <div className={""}>EUR €</div>
        <div className={""}>CONTACT</div>
        <div className={""}>TERMS OF SERVICE</div>
        <div className={""}>PRIVACY POLICY</div>
        <div className={""}>RETURNS & FAQ</div>
      </div>
    </div>
  )
}

export default Footer