import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Information from "../components/information"
import Spacer from "../components/spacer"

export default function InformationPage({data}) {
  var information = data.information
  return (
    <Layout>
      <Spacer className='x2' />
      <Information information={information} />
    </Layout>
  )
}

export const Head = () => <Seo title='' />

export const query = graphql`
    query PageQuery {
      information:datoCmsInformation {
        capabilities
        contact {
          link
          title
        }
        ethos
        join
        studio
        image {
          gatsbyImageData
        }
        video
        process {
          title
          content
        }
      }
    }       
`