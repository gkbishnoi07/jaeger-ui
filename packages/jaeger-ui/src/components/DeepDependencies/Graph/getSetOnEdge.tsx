// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { TRendererUtils } from '@jaegertracing/plexus/lib/Digraph/types';
import { TLayoutEdge } from '@jaegertracing/plexus/lib/types';

import { getEdgeId } from '../../../model/ddg/GraphModel';

import { EViewModifier } from '../../../model/ddg/types';

// exported for tests
export const baseCase = { className: 'Ddg--Edge' };
export const matchMiss = { className: 'Ddg--Edge', markerEnd: null };

export default function getSetOnEdge(edgesViewModifiers: Map<string, number>) {
  if (!edgesViewModifiers.size) {
    return baseCase;
  }
  return function setOnEdge(lv: TLayoutEdge<unknown>, utils: TRendererUtils) {
    const edgeId = getEdgeId(lv.edge.from, lv.edge.to);

    if ((edgesViewModifiers.get(edgeId) || 0) & EViewModifier.PathHovered) {
      const markerEnd = `url(#${utils.getGlobalId('arrow-hovered')})`;
      return { markerEnd, className: 'Ddg--Edge is-pathHovered' };
    }
    return matchMiss;
  };
}
