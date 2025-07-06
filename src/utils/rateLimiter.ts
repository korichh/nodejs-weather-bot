import { RATE_LIMITER_CONFIG } from "@/configs";

type UserId = string | number;

interface RateLimitOptions {
  windowMs: number;
  maxFastAttempts: number;
  minIntervalMs: number;
}

interface AttemptRecord {
  count: number;
  firstTimestamp: number;
  lastTimestamp: number;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<UserId, AttemptRecord> = new Map();

  constructor(private options: RateLimitOptions) {}

  public isAllowed(userId: UserId): boolean {
    const now = Date.now();
    const record = this.attempts.get(userId);

    if (record?.blockedUntil && now < record.blockedUntil) {
      return false;
    }

    if (!record || now - record.firstTimestamp > this.options.windowMs) {
      this.attempts.set(userId, {
        count: 1,
        firstTimestamp: now,
        lastTimestamp: now,
      });
      return true;
    }

    const timeSinceLast = now - record.lastTimestamp;

    if (timeSinceLast > this.options.minIntervalMs) {
      this.attempts.set(userId, {
        count: 1,
        firstTimestamp: now,
        lastTimestamp: now,
      });
      return true;
    }

    record.count += 1;
    record.lastTimestamp = now;

    if (record.count > this.options.maxFastAttempts) {
      record.blockedUntil = record.firstTimestamp + this.options.windowMs;
      this.attempts.set(userId, record);
      return false;
    }

    this.attempts.set(userId, record);
    return true;
  }
}

export const rateLimiter = new RateLimiter(RATE_LIMITER_CONFIG);
