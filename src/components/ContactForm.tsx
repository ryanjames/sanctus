import React, { useState, ChangeEvent } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { navigate } from "gatsby-link"
import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
}

const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactForm: React.FC<Props> = ({ className }) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>()

  const handleChange = (e: ChangeEvent<any>) => {
    const f = { ...formState }
    const inputValue: string = e.target.value
    const inputName: string = e.target.name
    f[inputName] = inputValue
    setFormState(f)
  }

  let thanks = undefined

  if (typeof window !== "undefined") {
    const queryParameters =   new URLSearchParams(window.location.search)
    const thanks = queryParameters.get("thanks")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": (form as any).getAttribute("name"),
        ...formState,
      }),
    })
      .then(() => navigate((form as any).getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
    <StyledContactForm className={`container ${className}`}>
      {thanks ? (
        <>
          <p>Thanks for getting in touch. We'll get back to you shortly.</p>
          <PageLink to="/contact">Back to form</PageLink>
        </>
      ) : (
        <form
          name="contact-form"
          method="post"
          action="/contact/?thanks=true"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <div tw="flex pt-8">
            <div tw="w-1/2 pr-12">
              <label className="label" htmlFor={"name"}>
                Your Name*
              </label>
              <div className="control">
                <input
                  className="input"
                  type={"text"}
                  name={"name"}
                  onChange={handleChange}
                  id={"name"}
                  required={true}
                />
              </div>
            </div>
            <div tw="w-1/2">
              <label className="label" htmlFor={"email"}>
                Email*
              </label>
              <div className="control">
                <input
                  className="input"
                  type={"email"}
                  name={"email"}
                  onChange={handleChange}
                  id={"email"}
                  required={true}
                />
              </div>
            </div>
          </div>
            <div tw="w-full pt-4 pb-2">
              <label className="label" htmlFor={"subject"}>
                Company (if applicable)
              </label>
              <div className="control">
                <input
                  className="input"
                  type={"text"}
                  name={"company"}
                  onChange={handleChange}
                  id={"company"}
                />
              </div>
            </div>
            <div tw="w-full pb-2">
              <label className="label" htmlFor={"subject"}>
               Subject* 
              </label>
              <div className="control">
                <input
                  className="input"
                  type={"subject"}
                  name={"subject"}
                  onChange={handleChange}
                  id={"subject"}
                  required={true}
                />
              </div>
            </div>
          <div className="field" tw="pt-8">
            <label className="label" htmlFor={"message"}>
              Message
            </label>
            <div className="control">
              <textarea className="textarea" name={"message"} onChange={handleChange} id={"message"} required={true} />
            </div>
          </div>
          <div tw="pt-5" className="field">
            <button tw="cursor-pointer" type="submit">
              Send
            </button>
          </div>
        </form>
      )}
    </StyledContactForm>
  )
}

const StyledContactForm = styled.div`
  ${tw``}
  .label {
    ${tw`text-sm pt-9`}
  }
  input {
    width: 100%;
  }
  textarea {
    width: 100%;
    height: 150px;
  }
  input,
  textarea {
    background: #131628;
    border-radius: 4px;
    padding: 6px;
    border: 1px solid rgba(255,255,255,0.3);
    color: #fff;
    padding: 6px;
    outline: none;
    &:focus {
      border: 1px solid rgba(255,255,255,0.6);
    }
  }
  button {
    background: #679CB2;
    border-radius: 6px;
    appearance: none;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 24px;
  }
`
export default ContactForm
