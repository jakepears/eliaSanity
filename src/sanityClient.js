/** @format */

import { createClient } from '@sanity/client';

export const client = createClient({
	projectId: 'vkim1ezj',
	dataset: 'production',
	useCdn: false,
	apiVersion: '2024-07-13', // Use the latest API version
});
