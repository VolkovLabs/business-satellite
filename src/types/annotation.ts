import { AnnotationEvent } from '@grafana/data';

export interface Annotation extends AnnotationEvent {
  /**
   * Prev State
   *
   * @type {string}
   */
  prevState?: string;
}
