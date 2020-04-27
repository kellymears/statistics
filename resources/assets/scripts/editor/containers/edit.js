/** react */
import React from 'react'

/** @wordpress */
import { __ } from '@wordpress/i18n'
import { useState, useCallback } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'
import { Button } from '@wordpress/components'

/** Modules */
import PropTypes from 'prop-types'

/**
 * Edit: tiny-pixel/statistics
 *
 * @prop {array} attribute.stats
 */
const edit = ({ attributes, className, setAttributes }) => {
  const { stats } = attributes
  const [statHover, setStatHover] = useState(
    useCallback(() => stats.map((stat, id) => ({ [id]: false })), []),
  )

  /**
   * Add a new item to the stats array
   */
  const addStat = () => {
    setAttributes({
      stats: [
        ...stats,
        {
          figure: '99k',
          label: 'Example statistic',
        },
      ],
    })
  }

  /**
   * Remove an item from the stats array
   */
  const removeStat = id => {
    setAttributes({
      stats: stats.filter((stat, index) => index !== id),
    })
  }

  /**
   * Set stat attribute
   *
   * @param {number} id
   * @param {string} key
   * @param {string} value
   */
  const setStat = (id, key, value) => {
    const stat = {
      ...stats[id],
      [`${key}`]: value,
    }

    setAttributes({
      stats: [...stats.slice(0, id), stat, ...stats.slice(id + 1)],
    })
  }

  /**
   * Class names
   * @see https://tailwindcss.com/docs/controlling-file-size/#writing-purgeable-html
   */
  const classes = {
    button: id => `
      transition duration-200 transition-opacity
      ${statHover[id] ? `opacity-100` : `opacity-0`}
    `,
    columns: () => {
      switch (stats.length) {
        case 2:
          return 'md:w-1/2'
        case 3:
          return 'md:w-1/3'
        case 4:
          return 'md:w-1/4'
      }
    },
  }

  /**
   * Render the component.
   */
  return (
    <section className={className}>
      <div className="text-gray-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            {stats.map((stat, id) => (
              <div
                key={id}
                className={`p-4 ${classes.columns()}`}
                onMouseEnter={() => setStatHover({ [id]: true })}
                onMouseLeave={() => setStatHover({ [id]: false })}>
                <RichText
                  tagName={`h2`}
                  className={`font-medium sm:text-4xl text-3xl text-gray-900`}
                  value={stat.figure}
                  onChange={value => setStat(id, 'figure', value)}
                />
                <RichText
                  tagName={`p`}
                  className={`leading-relaxed`}
                  value={stat.label}
                  onChange={value => setStat(id, 'label', value)}
                />
                <Button
                  isSecondary
                  className={classes.button(id)}
                  onClick={() => removeStat(id)}>
                  {__('Remove item', 'tiny-pixel')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.length < 4 && (
        <Button isPrimary onClick={addStat}>
          {__('Add item', 'tiny-pixel')}
        </Button>
      )}
    </section>
  )
}

edit.propTypes = {
  attributes: PropTypes.shape({
    stats: PropTypes.shape({
      figure: PropTypes.string,
      label: PropTypes.string,
    }),
  }),
  className: PropTypes.string,
  setAttributes: PropTypes.func,
}

export { edit }
