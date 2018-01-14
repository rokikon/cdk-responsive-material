import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-root',
  template: `
      <!--The content below is only a placeholder and can be replaced.-->
      <div class="container"
           [ngClass]="containerClass">

          <div id="mobile"
               *ngIf="isMobile | async">This is Mobile View
          </div>
          <div id="mobile-landscape"
               *ngIf="isMobileLandscape | async">This is Mobile Landscape View
          </div>

          <div id="tablet"
               *ngIf="isTablet | async">This is Tablet View
          </div>
          <div id="tablet-landscape"
               *ngIf="isTabletLandscape | async">This is Tablet Landscape View
          </div>

          <div id="desktop"
               *ngIf="isDesktop | async">This is Desktop View
          </div>

      </div>

  `,
  styles: [
      `
          .container {
              height: 100%;
              display: flex;
              justify-content: center;
              align-content: center;
              flex-direction: column;
              background-color: #fff;
          }

          .container div {
              text-align: center;
          }

          .desktop {
              width: 960px;
              margin: 0 auto;
          }
    `,
  ],
})
export class AppComponent {
  isMobile: Observable<boolean>;
  isMobileLandscape: Observable<boolean>;
  isTablet: Observable<boolean>;
  isTabletLandscape: Observable<boolean>;
  isDesktop: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {

    this.isMobile = breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
    ]).pipe(map(result => result.matches));
    this.isMobileLandscape = breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
    ]).pipe(map(result => result.matches));

    this.isTablet = breakpointObserver.observe([
      Breakpoints.TabletPortrait,
    ]).pipe(map(result => result.matches));
    this.isTabletLandscape = breakpointObserver.observe([
      Breakpoints.TabletLandscape,
    ]).pipe(map(result => result.matches));

    this.isDesktop = breakpointObserver.observe([
      Breakpoints.Web,
    ]).pipe(map(result => result.matches));

  }

  get containerClass() {
    let media = 'desktop';
    if ( this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait) ) {
      media = 'mobile';
    } else if ( this.breakpointObserver.isMatched(Breakpoints.HandsetLandscape) ) {
      media = 'mobile-landscape';
    } else if ( this.breakpointObserver.isMatched(Breakpoints.TabletPortrait) ) {
      media = 'tablet';
    } else if ( this.breakpointObserver.isMatched(Breakpoints.TabletLandscape) ) {
      media = 'tablet-landscape';
    }
    return media;
  }
}
