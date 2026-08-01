import * as React from "react"

class EnquiryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formSubmitted: false,
      message: ""

    }
    
  }
  componentDidMount() {
    document.querySelector("#contact").addEventListener("submit", this.handleSubmit)
  }
  handleSubmit = e => {
    e.preventDefault()
    let myForm = document.getElementById("contact")
    let formData = new FormData(myForm)
    if(formData.get('Name') && formData.get('Email')){
      console.log('test fetch')
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      .then(() => {
        const form = document.querySelector("#contact")
        form.classList.add("fade-out")
        setTimeout(() => {
          this.setState({ formSubmitted: true },()=>{
            const thankYou = document.querySelector("#thank-you")
            setTimeout(()=>{
              thankYou.classList.add("fade-in-thank-you")
            },100)
           
          })
        }, 1250)
      })
    .catch(error => console.error(error))
    document.querySelector("#contact").addEventListener("submit", this.handleSubmit);
    }
  }
  render() {
    const formSubmitted = this.state.formSubmitted
    if(!formSubmitted){
    return (
      <form method="POST" data-netlify="true" id="contact" className="contact--form flex flex-col gap-5">
        <input type="hidden" name="form-name" value="contact" />
        <input required={true} name="Name" type="text" className="input" placeholder="Name"/>
        <input required={true} name="Email" type="text" className="input" placeholder="Email Address" />
        <input name="Project Type" type="text" className="input" placeholder="Project Type" />
        <input name="Website" type="text" className="input" placeholder="Existing Website (if available)" />
        <input name="Figma Link" type="text" className="input" placeholder="Figma Link (if applicable)" />
        <textarea onChange={(e) => this.setState({message:e.target.value})} value={this.state.message} className="textarea input" name="message" placeholder='Project Description' type="text" id="message" />
        <button type="submit" className="submit-button input">Submit</button>
        <p className='grey mt5'>Typical Response time: 12 hours</p>
      </form>
    )} else {
      return (
      <div className="thank-you" id="thank-you">
        <p className='op-50'>Thank you for your enquiry. We’ll be in touch shortly.</p>
      </div>
      )
    }
  }
}

export default EnquiryForm
