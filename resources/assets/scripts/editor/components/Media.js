/** @wordpress */
import { Button } from '@wordpress/components'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'

/** Modules */
import PropTypes from 'prop-types'

/**
 * Allowed media types
 * @const {array} ALLOWED_MEDIA_TYPES
 */
const ALLOWED_MEDIA_TYPES = ['image']

/**
 * Component
 *
 * @param {number}   id
 * @param {string}   url
 * @param {function} setMedia
 */
const Media = ({ id, url, setMedia }) => (
  <MediaUploadCheck>
    <MediaUpload
      allowedMediaTypes={ALLOWED_MEDIA_TYPES}
      multiple={false}
      value={id}
      onSelect={setMedia}
      render={({ open }) => (
        <>
          {url && (
            <figure>
              <img alt="alt text" src={url} />
            </figure>
          )}

          <Button isPrimary onClick={open}>
            {id ? 'Replace' : 'Add'} image
          </Button>
        </>
      )}
    />
  </MediaUploadCheck>
)

Media.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  setMedia: PropTypes.func,
}

export default Media
