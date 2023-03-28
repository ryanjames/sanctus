import React, { useState, useEffect, useRef, ChangeEvent } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { navigate } from "gatsby-link"
import withLocation from "../utils/withLocation"
import trackSearchContent from "../staticQueries/trackSearch"
import Select from 'react-select'
import selectFieldStyles from "../config/selectFieldStyles"
import queryString from "query-string"

type Props = {
  className?: string,
  location: {
    search: string
  }
}

const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const LicensingForm: React.FC<Props> = ({ className, location }) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>()
  const [selectedTrack, setSelectedTrack] = useState<any>()

  const trackInterestRef = useRef<HTMLInputElement>(null)
  const videoCountRef = useRef<HTMLInputElement>(null)

  const videoCounts = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: ">5", label: "More than 5" },
  ]

  const urlQuery = queryString.parse(location.search)
  const tracks = trackSearchContent()

  useEffect(() => {
    if (urlQuery && tracks) {
      setSelectedTrack(tracks.find(track => track.id === urlQuery.selectedtrack))
    }
  }, [])


  const handleChange = (e: ChangeEvent<any>) => {
    const f = { ...formState }
    const inputValue: string = e.target.value
    const inputName: string = e.target.name
    f[inputName] = inputValue
    setFormState(f)
  }

  const handleSelectChange = (values: any, ref: any) => {
    let value
    if(Array.isArray(values)) {
      value = values.map(x => x.value).join(", ")
      console.log(value)
    } else {
      value = values.value
    }
    ref.current.setAttribute("value", value)
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
    <StyledLicensingForm className={`container ${className}`}>
      <form
        name="licensing-form"
        method="post"
        action="/licensing/?thanks=true"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <div tw="flex pb-2">
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
        <div tw="w-full">
          <label className="label" htmlFor={"company"}>
            Your Company
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
        <div tw="w-full">
          <label className="label checkbox-control" htmlFor={"curate-playlist"}>
            <input type="checkbox" value="Yes" name="curate-playlist" id="curate-playlist" /> Please curate a playlist for my project.
          </label>
        </div>
        <div tw="w-full pb-2">
          <label className="label" htmlFor={"track-interest"}>
            Select any specific tracks you’re interested in licensing.
          </label>
          {selectedTrack ? (
            <Select
              isMulti
              defaultValue={[selectedTrack]}
              placeholder="Search..."
              options={tracks}
              onChange={(newValue) => handleSelectChange(newValue, trackInterestRef)}
              styles={selectFieldStyles}
              className="select-field"
              classNamePrefix="select-field"
            />
          ) : (
            <>
            <Select
              isMulti
              placeholder="Search..."
              options={tracks}
              onChange={(newValue) => handleSelectChange(newValue, trackInterestRef)}
              styles={selectFieldStyles}
              className="select-field"
              classNamePrefix="select-field"
            />
            </>
          )}
          <input ref={trackInterestRef}
              type={"text"}
              readOnly
              name={"track-interest"}
              value="Test"
              id={"track-interest"}
            />
        </div>
        <div tw="w-full pb-2">
          <label className="label" htmlFor={"end-client"}>
           Who is the end client obtaining the license or roughly how many do they employ?*
          </label>
          <div className="control">
            <input
              className="input"
              type={"text"}
              name={"end-client"}
              onChange={handleChange}
              id={"end-client"}
              required={true}
            />
          </div>
        </div>
        <div tw="w-full pb-2">
          <label className="label" htmlFor="video-count">
           How many videos will this be used in? (Not including cutdowns)*
          </label>
          <div className="control">
            <Select
              placeholder="Select..."
              options={videoCounts}
              onChange={(newValue) => handleSelectChange(newValue, videoCountRef)}
              styles={selectFieldStyles}
              className="select-field"
              classNamePrefix="select-field"
              required={true}
            />
            <input ref={videoCountRef}
              type={"text"}
              value="Test"
              readOnly
              name={"video-count"}
              id={"video-count"}
            />
          </div>
        </div>
        <div tw="w-full pb-2">
          <label className="label" htmlFor={"distribution-needs"}>
           What distribution needs to be covered? (web, internal, ect)*
          </label>
          <div className="control">
            <input
              className="input"
              type={"text"}
              name={"distribution-needs"}
              onChange={handleChange}
              id={"distribution-needs"}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={"advertising-campaign"}>
            If part of a paid advertising campaign (i.e. broadcast, social, ott, ect), please include details here (i.e. regions, length of campaign, etc)
          </label>
          <div className="control">
            <textarea className="textarea" name={"advertising-campaign"} onChange={handleChange} id={"advertising-campaign"} required={true} />
          </div>
        </div>
        <div tw="w-full">
          <label className="label checkbox-control" tw="mb-5" htmlFor={"customized-track"}>
            <input type="checkbox" value="Yes" name="customized-track" id="customized-track" /> I am interested in having Sanctus customize a library track for my project.
          </label>
        </div>
        <div tw="w-full pb-2">
          <label className="label checkbox-control" tw="mb-5" htmlFor={"sound-and-mixing"}>
            <input type="checkbox" value="Yes" name="sound-and-mixing" id="sound-and-mixing" /> I am interested in Sanctus providing sound design and mixing for my project.
          </label>
        </div>
        
        <div tw="pt-5" className="field">
          <button tw="cursor-pointer" type="submit">
            Send
          </button>
        </div>
      </form>
    </StyledLicensingForm>
  )
}

const StyledLicensingForm = styled.div`
  ${tw``}
  .label {
    ${tw`text-sm pt-9 pb-2 leading-tight block`}
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
  .select-field__menu {
    background-color: #17203C;
  }
  button {
    background: #679CB2;
    border-radius: 6px;
    appearance: none;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 24px;
  }
  .checkbox-control {
    display: grid;
    padding-bottom: 0;
    grid-template-columns: 1em auto;
    gap: 1.5em;
    input[type="checkbox"] {
      appearance: none;
      background-color: #121628;
      margin: 0;
      font: inherit;
      color: #fff;
      width: 20px;
      height: 20px;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 4px;
      transform: translateY(-0.25em);
      display: grid;
      place-content: center;
    }
    input[type="checkbox"]::before {
      content: "";
      width: 12px;
      height: 12px;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: center center;
      transition: 120ms transform ease-in-out;
      background-color: #fff;
    }
    input[type="checkbox"]:checked {
      border: 1px solid rgba(255,255,255,0.6);
    }
    input[type="checkbox"]:checked::before {
      transform: scale(1);
    }
    input[type="checkbox"]:focus {
      border: 1px solid rgba(255,255,255,0.6);
    }
  }

`
export default withLocation(LicensingForm)
