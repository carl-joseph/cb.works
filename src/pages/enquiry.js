import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Enquiry from "../components/enquiry"
import Spacer from "../components/spacer"

export default function EnquiryPage({data}) {
  var information = data.information
  return (
    <Layout enquiry> 
      <Spacer className='x2' />
      <Enquiry information={information} />
    </Layout>
  )
}

export const Head = () => <Seo title='Enquiry' />

export const query = graphql`
  query PageQuery {
    information:datoCmsInformation {
      contact {
        link
        title
      }
      previews {
        gatsbyImageData
      }
    }
  }       
`