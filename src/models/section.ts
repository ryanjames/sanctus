export interface ISectionMediaAsset {
  file: {
    contentType: string
  }
  localFile: {
    publicURL: string
  }
}

export interface ISection {
  title: string
  body: {
    raw: string
  }
  buttonText: string
  link: string
  mediaAsset: ISectionMediaAsset
  mediaControls: boolean
  stacked: boolean
  orientation?: string
}

export const getSections = (sections: ISection[]) => {
  let floatedOrientation: string
  const sectionNodes = sections.map((section: ISection, i: number) => {
    if(section.stacked || section.body && !section.mediaAsset || section.mediaAsset && !section.body) {
      section.orientation = 'stacked'
    } else {
      floatedOrientation = floatedOrientation == 'left' ? 'right' : 'left'
      section.orientation = floatedOrientation
    }
    if(section.body || section.mediaAsset) {
      return  {
        ...section
      }
    } else {
      return
    }
  })
  return sectionNodes.filter(section => {
    return section !== undefined;
  }) as ISection[]
}