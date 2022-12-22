import React, { Component } from 'react'
// import { Flipper } from 'react-flip-toolkit'
// import { Heading } from '../../Heading'
// import { Container } from './Container'
// import { Item } from './Items'
// import { Wrapper } from './Wrapper'

// const navbarConfig = [
//     //{ title: "Products", dropdown: ProductsDropdown },
//     { title: 'Tools', dropdown: () => <Heading>Test</Heading> },
//     //{ title: "Company", dropdown: CompanyDropdown },
//     { title: 'Links', dropdown: () => <Heading>Test</Heading> },
// ]

// export default class Navbar extends React.Component<
//     { duration: number },
//     { activeIndices: any; animatingOut: boolean }
// > {
//     state = {
//         activeIndices: [],
//         animatingOut: false,
//     }

//     resetDropdownState = (i: any) => {
//         this.setState({
//             activeIndices: typeof i === 'number' ? [i] : [],
//             animatingOut: false,
//         })
//         delete this.animatingOutTimeout
//     }

//     onMouseEnter = (i: any) => {
//         if (this.animatingOutTimeout) {
//             clearTimeout(this.animatingOutTimeout)
//             this.resetDropdownState(i)
//             return
//         }
//         if (this.state.activeIndices[this.state.activeIndices.length - 1] === i)
//             return

//         this.setState((prevState: any) => ({
//             activeIndices: prevState.activeIndices.concat(i),
//             animatingOut: false,
//         }))
//     }

//     onMouseLeave = () => {
//         this.setState({
//             animatingOut: true,
//         })
//         this.animatingOutTimeout = setTimeout(
//             this.resetDropdownState,
//             this.props.duration
//         )
//     }
//     animatingOutTimeout: any

//     render() {
//         const { duration } = this.props
//         let CurrentDropdown: any
//         let PrevDropdown: any
//         let direction: string

//         const currentIndex =
//             this.state.activeIndices[this.state.activeIndices.length - 1]
//         const prevIndex =
//             this.state.activeIndices.length > 1 &&
//             this.state.activeIndices[this.state.activeIndices.length - 2]

//         if (typeof currentIndex === 'number')
//             CurrentDropdown = navbarConfig[currentIndex].dropdown
//         if (typeof prevIndex === 'number') {
//             PrevDropdown = navbarConfig[prevIndex].dropdown
//             direction = currentIndex > prevIndex ? 'right' : 'left'
//         }

//         return (
//             <Flipper
//                 flipKey={currentIndex}
//                 spring={
//                     duration === 300
//                         ? 'noWobble'
//                         : { stiffness: 10, damping: 10 }
//                 }
//             >
//                 <Wrapper onMouseLeave={this.onMouseLeave}>
//                     {navbarConfig.map((n, index) => {
//                         return (
//                             <Item
//                                 key={n.title}
//                                 title={n.title}
//                                 index={index}
//                                 onMouseEnter={this.onMouseEnter}
//                             >
//                                 {currentIndex === index && (
//                                     <Container
//                                         animate={this.state.animatingOut}
//                                         duration={duration}
//                                     >
//                                         <CurrentDropdown />
//                                         {PrevDropdown && <PrevDropdown />}
//                                     </Container>
//                                 )}
//                             </Item>
//                         )
//                     })}
//                 </Wrapper>
//             </Flipper>
//         )
//     }
// }
