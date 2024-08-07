/** @format */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: 'vkim1ezj',
	dataset: 'production',
	useCdn: false,
	apiVersion: '2024-07-13', // Use the latest API version
});
const builder = imageUrlBuilder(client);
export function urlFor(source) {
	return builder.image(source);
}
