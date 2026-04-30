import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import ProjectGrid from "../components/projectGrid"
import Spacer from "../components/spacer"

export default function EnquiryPage({data}) {
  var projects = data.projects
  return (
    <Layout>
       
    </Layout>
  )
}

export const Head = () => <Seo title='' />

export const query = graphql`
    query PageQuery {
      projects:allDatoCmsProject(sort: {position: ASC }) {
        edges {
          node {
            title
            link
            image {
              gatsbyImageData
            }
            imageGallery {
              gatsbyImageData
            }
            backgroundColor {
              rgb
            }
            background {
              gatsbyImageData
            }
            description
            designCredit
            year
          }
        }
      }
    }       
`