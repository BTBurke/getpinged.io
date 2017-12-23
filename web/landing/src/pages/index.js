import React from 'react'
import Link from 'gatsby-link'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import roboto from './fonts/roboto.css'
import Hero from '../components/hero';
import Screenshot from '../components/screenshot'
import Follow from '../components/follow'


const styles = theme => ({
})

const IndexPage = ({ classes }) => (
  <div>
    <Hero />
    <Screenshot />
    <Follow />
  </div>
)

export default withStyles(styles)(IndexPage)
