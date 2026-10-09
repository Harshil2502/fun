import React from 'react';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';
import { content } from '../../content/content';

interface DateCouponsProps {
  isCompleted: boolean;
  redeemedCoupons: string[];
  onRedeemCoupon: (couponId: string) => void;
  onSoundPaper?: () => void;
  onSoundChime?: () => void;
}

export const DateCoupons: React.FC<DateCouponsProps> = ({
  isCompleted,
  redeemedCoupons,
  onRedeemCoupon,
  onSoundPaper,
  onSoundChime,
}) => {
  const handleToggleCoupon = (id: string) => {
    onSoundPaper?.();
    onRedeemCoupon(id);
    onSoundChime?.();
  };

  return (
    <Card
      rotation="0.6deg"
      className="w-full relative overflow-hidden"
    >
      {/* Orange Washi Tape */}
      <div
        className="washi-tape -top-2.5 right-16 w-24 pointer-events-none"
        style={{ backgroundColor: 'var(--rb-orange-wash)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span
            className="text-[11px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: 'var(--rb-orange-wash)', color: 'var(--text-ink)' }}
          >
            Orange Gouache • Activity 06
          </span>
          <h3 className="font-hand text-[28px] text-ink font-semibold">
            Tear-Off Date Coupons
          </h3>
          <p className="font-serif text-xs text-ink-muted">
            Handcrafted vouchers for quiet times together. Tuck any coupon into your pocket to claim it.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-ink-muted">
            Claimed: {redeemedCoupons.length} / {content.activities.coupons.items.length}
          </span>
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full text-xs font-serif bg-rb-orange-wash text-ink border border-rb-orange/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rb-orange" />
              Orange Stamp Painted
            </span>
          )}
        </div>
      </div>

      {/* Grid of Perforated Ticket Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {content.activities.coupons.items.map((coupon) => {
          const isRedeemed = redeemedCoupons.includes(coupon.id);

          return (
            <div
              key={coupon.id}
              className={`rounded-card border transition-all p-4 relative flex flex-col justify-between ${
                isRedeemed
                  ? 'border-rb-orange/60 bg-rb-orange-wash/50 shadow-paper-flat'
                  : 'border-seam bg-surface hover:border-pencil shadow-paper-flat'
              }`}
            >
              {/* Ticket Perforation Notch effect */}
              <div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-canvas border-r border-seam"
                aria-hidden="true"
              />
              <div
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-canvas border-l border-seam"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between text-[11px] font-serif text-ink-muted mb-1.5">
                  <span className="uppercase tracking-wider">{coupon.edition}</span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-surface-warm border border-seam text-[10px]">
                    {coupon.tag}
                  </span>
                </div>

                <h4 className="font-hand text-[22px] font-semibold text-ink leading-snug">
                  {coupon.title}
                </h4>

                <p className="font-serif text-xs text-ink-muted leading-relaxed mt-1 mb-4">
                  {coupon.description}
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-seam flex items-center justify-between">
                <span className="text-[11px] font-serif italic text-ink-muted">
                  {isRedeemed ? '✓ Saved in Pragya’s pocket' : 'Ready to claim'}
                </span>

                <Button
                  variant={isRedeemed ? 'ghost' : 'wash'}
                  washColor={isRedeemed ? undefined : 'var(--rb-orange-wash)'}
                  onClick={() => handleToggleCoupon(coupon.id)}
                  ariaLabel={`${isRedeemed ? 'Untuck' : 'Claim'} coupon: ${coupon.title}`}
                  className="text-xs px-3 py-1.5"
                >
                  {isRedeemed ? 'Put back' : 'Tuck into pocket'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
