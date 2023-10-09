import { useRouter } from 'next/router'
 
function ActiveLink({ children, href, relative }) {
  const router = useRouter()
  let style = {
    color: router.asPath === href ? 'rgb(41, 123, 64)' : '',
    fontWeight: (children.type === 'li' && router.asPath === href) ? 'bold' : '',
  }
  if (href === router.pathname && relative === true) {
    style = {...style, color: 'rgb(41, 123, 64)'}
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink
