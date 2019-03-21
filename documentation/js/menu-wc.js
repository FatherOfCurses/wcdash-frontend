'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">wcdash documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' : 'data-target="#xs-components-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' : 'id="xs-components-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AverageHandlingTimeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AverageHandlingTimeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompexecbyhourComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompexecbyhourComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompexecpercentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompexecpercentComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompvsexecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompvsexecComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DailyvolumeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DailyvolumeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HourlyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HourlyComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ToptencustComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToptencustComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ToptenreasonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToptenreasonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TransactioncountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TransactioncountComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' : 'data-target="#xs-injectables-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' : 'id="xs-injectables-links-module-AppModule-f06e6280c621aef502b1f90991598f1a"' }>
                                        <li class="link">
                                            <a href="injectables/CompleteTransService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CompleteTransService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExceptionTransService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ExceptionTransService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MessageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToptencustService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ToptencustService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToptenreasonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ToptenreasonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/CompleteTrans.html" data-type="entity-link">CompleteTrans</a>
                    </li>
                    <li class="link">
                        <a href="classes/Customer.html" data-type="entity-link">Customer</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExceptionReason.html" data-type="entity-link">ExceptionReason</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExceptionTrans.html" data-type="entity-link">ExceptionTrans</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/CompleteTransService.html" data-type="entity-link">CompleteTransService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CompleteTransService-1.html" data-type="entity-link">CompleteTransService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ExceptionTransService.html" data-type="entity-link">ExceptionTransService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MessageService.html" data-type="entity-link">MessageService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ToptencustService.html" data-type="entity-link">ToptencustService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ToptenreasonService.html" data-type="entity-link">ToptenreasonService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
