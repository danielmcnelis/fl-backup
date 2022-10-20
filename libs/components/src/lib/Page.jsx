import { NavBar } from './NavBar'
import { Footer } from './Footer'

export const Page = (props) => {
  const { element } = props
  return (
    <>
      <NavBar />
      {element}
      <Footer />
    </>
  )
}
