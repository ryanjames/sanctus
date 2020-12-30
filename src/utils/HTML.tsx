import React from 'react'
import PropTypes from 'prop-types'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import visit from 'unist-util-visit'

const removeRootP = () => tree => {
  visit(
    tree,
    // only visit p tags that contain an img element
    node =>
      node.tagName === 'p' && node.parentNode == null,
    node => {
      node.tagName = 'span';
    },
    node => {
      console.log(JSON.stringify(node));
    }
  );
};

const HTML = ({ content, rootP, className }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: toHTML(content, rootP) }} />
)

export const toHTML = (value, rootP) => {
  return unified()
          .use(markdown, {commonmark: true})
          .use(remark2rehype)
          .use(rootP ? null : removeRootP)
          .use(html)
          .processSync(value)
}

HTML.propTypes = {
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
  rootP: PropTypes.bool
}
HTML.defaultProps = {
  rootP: true 
}

export default HTML 
