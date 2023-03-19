import { AnnotationEvent } from '@grafana/data';

/**
 * Annotation Event
 */
export interface Annotation extends AnnotationEvent {
  /**
   * Prev State
   *
   * @type {string}
   */
  prevState?: string;
}
