'use client';

import { Analytics } from '@shibaone/analytics';
import { v4 as uuidv4 } from 'uuid';
let analyticsIstance: Analytics;

export function setupTracking() {
  let analytics: Analytics;
  try {
    let userTrackingId: string | null = localStorage.getItem('user_tracking_id');

    if (!userTrackingId) {
      userTrackingId = uuidv4();
      localStorage.setItem('user_tracking_id', userTrackingId);
    }
    if (!analyticsIstance) {
      const clientId = 'sns-id';
      const sessionId = 'session-id';
      const userProperties = {
        user_tracking_id: userTrackingId,
      } as any;
      const referrer = '';

      analytics = new Analytics(clientId, sessionId, referrer, userProperties);
      analytics.logEnabled = false;
      analytics.trackPageClose();

      analyticsIstance = analytics;
    } else {
      analytics = analyticsIstance;
    }

    return analytics;
  } catch (err) {
    console.error(err);
  }
  return analyticsIstance;
}
