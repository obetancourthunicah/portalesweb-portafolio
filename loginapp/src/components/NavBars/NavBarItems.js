function NavBarItems({label, uri}){
  return (
    <li><a alt={label} href={uri} >{label}</a></li>
  );
}

export default NavBarItems;
