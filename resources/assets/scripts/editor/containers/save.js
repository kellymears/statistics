/** @wordpress */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { RichText } from '@wordpress/block-editor'

/** Modules */
import PropTypes from 'prop-types'

/**
 * Save: tiny-pixel/statistics
 *
 * @prop {array} attribute.stats
 */
const save = ({ attributes: { stats } }) => {
  const blockProps = {
    className: getBlockDefaultClassName('tiny-pixel/statistics'),
  }

  /**
   * classNames
   */
  const classes = {
    columns: () => {
      switch (stats.length) {
        case 2:
          return `md:w-1/2`
        case 3:
          return `md:w-1/3`
        case 4:
          return `md:w-1/4`
        case 'default':
          return null
      }
    },
  }

  return (
    <section {...blockProps}>
      <div className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            {stats.map((stat, id) => (
              <div key={id} className={`p-4 ${classes.columns()}`}>
                <RichText.Content
                  tagName={`h2`}
                  className={`font-medium sm:text-4xl text-3xl text-gray-900`}
                  value={stat.figure}
                />
                <RichText.Content
                  tagName={`p`}
                  className={`leading-relaxed`}
                  value={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

save.propTypes = {
  attributes: PropTypes.shape({
    stats: PropTypes.shape({
      figure: PropTypes.string,
      label: PropTypes.string,
    }),
  }),
}

export { save }
