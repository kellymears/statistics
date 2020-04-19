/** @wordpress */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'

/** styles */
import './../../styles/tailwind.css'

/** tiny-pixel/statistics components */
import { edit } from './containers/edit'
import { save } from './containers/save'
import { attributes } from './attributes.json'

/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param {string} name
 * @param {Object} settings
 */
registerBlockType('tiny-pixel/statistics', {
  /**
   * The block title.
   * @param {string}
   */
  title: __('Statistics', 'tiny-pixel'),

  /**
   * A short description of the block.
   */
  description: __('Displays a set of quanitifiable figures.', 'tiny-pixel'),

  /**
   * The block category.
   */
  category: 'common',

  /**
   * Extended support features
   */
  supports: {
    /**
     * Enable alignments.
     * Set to true to enable all.
     */
    align: true,

    /**
     * Enable wide alignment.
     * Dependent on the supports.align definition.
     */
    alignWide: true,

    /**
     * This property adds a field to define a custom className
     * for the block wrapper.
     */
    customClassName: true,

    /**
     * Allow a block's markup to be edited.
     */
    html: true,

    /**
     * Hide a block from the inserter so that it can
     * only be inserted programmatically.
     */
    inserter: true,

    /**
     * A non-multiple block can be inserted into each post, one time only.
     */
    multiple: true,

    /**
     * Allows the block to be used as a Reusable Block.
     */
    reusable: true,
  },

  /**
   * Block attributes.
   */
  attributes,

  /**
   * Component to render in the editor.
   */
  edit,

  /**
   * Component to render to the database.
   */
  save,
})
