// Jest setup provided by Grafana scaffolding
import './.config/jest-setup';
import { TextDecoder, TextEncoder } from 'util';

/**
 * Logger
 */
jest.mock('./src/utils/logger');

/**
 * Assign Text Decoder and Encoder which are required in @grafana/ui
 */
Object.assign(global, { TextDecoder, TextEncoder });
