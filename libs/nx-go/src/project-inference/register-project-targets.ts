import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { TargetConfiguration } from '@nrwl/devkit';

const METADATA_FILE = 'metadata.json';
export const projectFilePatterns = [METADATA_FILE];

export function registerProjectTargets(
  projectFilePath: string
): Record<string, TargetConfiguration> {
  const projectRoot = dirname(projectFilePath);
  const projectConfig = JSON.parse(
    readFileSync(join(projectRoot, 'project.json'), { encoding: 'utf8' })
  );
  const metadata = JSON.parse(
    readFileSync(join(projectRoot, METADATA_FILE), {
      encoding: 'utf8',
    })
  );

  if (metadata.runtime !== 'go') {
    return {};
  }

  const defaultTargets = {
    lint: {
      inputs: ['default', 'nxGoPlugin'],
      executor: '@repro/nx-go:lint',
    },
    test: {
      inputs: ['default', 'nxGoPlugin'],
      executor: '@repro/nx-go:test',
    },
  };

  if (metadata.type === 'service') {
    return {
      ...defaultTargets,
      build: {
        inputs: ['default', 'nxGoPlugin'],
        executor: '@repro/nx-go:build',
      },
      serve: {
        inputs: ['default', 'nxGoPlugin'],
        executor: '@repro/nx-go:serve',
      },
    };
  }

  return defaultTargets;
}
