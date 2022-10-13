(function () {
  var body = document.getElementsByTagName('body')[0],
    gameId = "82038e98-d4e1-46dd-8de9-1460d1395eab",
    affiliateId = "A1000-1",
    portalId = "4638e320-4444-4514-81c4-d80a8c662371",
    packageId = "8-ball-billiards-classic",
    redirectUrl = "https://games.cdn.famobi.com/html5games/0/8-ball-billiards-classic/v250/?fg_domain=play.famobi.com&fg_aid=A1000-1&fg_uid=82038e98-d4e1-46dd-8de9-1460d1395eab&fg_pid=4638e320-4444-4514-81c4-d80a8c662371&fg_beat=540",
    isAffiliateUrl = "0",
    gameTeaser = "https://img.cdn.famobi.com/portal/html5games/images/tmp/8BallBilliardsClassicTeaser.jpg",
    gameHeader = "https://img.cdn.famobi.com/portal/html5games/images/tmp/8BallBilliardsClassicHeader.jpg",
    gameTitle = "8 Ball Billiards Classic",
    portalParams = { "ad_ingame": true, "adsense_channel_id": "7657524996", "adx_channel_id": "6439200997", "more_games_url": "http:\/\/html5games.com", "dfp_available": false, "rev_share": "0.0", "domains": { "primary": "html5games.com" }, "cms": { "active": false, "categories": [{ "id": "girls", "name": "Girls" }, { "id": "make-up", "name": "Make-up" }, { "id": "dress-up", "name": "Dress-up" }, { "id": "cooking", "name": "Cooking" }, { "id": "racing", "name": "Racing" }, { "id": "cars", "name": "Cars" }, { "id": "match-3", "name": "Match 3" }, { "id": "quiz", "name": "Quiz" }, { "id": "jump-and-run", "name": "Jump & Run" }, { "id": "puzzle", "name": "Puzzle" }, { "id": "skill", "name": "Skill" }, { "id": "sports", "name": "Sports" }, { "id": "action", "name": "Action" }, { "id": "arcade", "name": "Arcade" }, { "id": "bubble-shooter", "name": "Bubble Shooter" }, { "id": "cards", "name": "Card" }], "identifier": "html5gamescom", "colors": { "primary": "#e1e1e1", "headline": "#333333", "accent": "#333333", "secondary": "#eb4f00" } }, "more_games_image": "\/portal\/4638e320-4444-4514-81c4-d80a8c662371\/more-games-button\/600x253\/5f564cb67de77.png", "cache-buster": "5f564cbd6bef4", "logo": "\/portal\/4638e320-4444-4514-81c4-d80a8c662371\/icon\/260x60\/5a6125b404915.png" },
    adProvider = "dfp",
    preventIFrame = "0",
    redirectTimer = null,
    isInsideFrame = (function () {
      try {
        return window.top !== window.self;
      } catch (e) {
        return true;
      }
    })(),
    showWebmasterNotification = false,
    isRestricted = "",
    redirectToBlank = isInsideFrame && adProvider === "dfp" && portalParams.ad_ingame && !portalParams.dfp_available,
    getUrlParams = function (a, b, c) {
      a = /[?&]?([^=]+)=([^&]*)/g, b = document.location && document.location.search ? document.location.search.split("+").join(" ") : "";
      for (var d = {}; c = a.exec(b);) d[decodeURIComponent(c[1])] = decodeURIComponent(c[2]);
      return d;
    },
    getGameLink = function () {
      return 'https://play.famobi.com/' + packageId + '/' + affiliateId;
    },
    getLinkToGame = function () {
      var originalRef = '';
      var params = getUrlParams();
      if (params.original_ref) {
        originalRef = params.original_ref;
      } else {
        originalRef = document.referrer;
      }

      var originalRefParam = '';
      if (originalRef.indexOf('&original_ref') > -1) {
        // preserve original_ref param while preventing endless appending when gameapi redirects to a fresh beat
        originalRefParam = originalRef.substr(originalRef.indexOf('&original_ref') + 1);
        if (originalRefParam.indexOf('&') > -1)
          originalRefParam = originalRefParam.substr(0, originalRefParam.indexOf('&'))
      } else {
        originalRefParam = 'original_ref=' + encodeURIComponent(originalRef);
      }
      redirectUrl = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + originalRefParam;
      return redirectUrl + (document.location.hash ? document.location.hash : '');
    },
    getHTML = function () {
      var game = {},
        type = '',
        linksLiNode = null,
        linksANode = null,
        linkClassName = '',
        linkText = '';

      var bodyNode = document.getElementsByTagName('body')[0];
      bodyNode.style.margin = 0;

      var fgAppsNode = document.createElement('div');
      fgAppsNode.id = 'fg-apps';

      var gameHeaderNode = document.createElement('div');
      gameHeaderNode.className = 'background';
      gameHeaderNode.style.backgroundImage = 'url(' + gameHeader + ')';
      fgAppsNode.appendChild(gameHeaderNode);

      var articleNode = document.createElement('article');
      var h1Node = document.createElement('h1');
      var titleNode = document.createElement('span');
      titleNode.innerHTML = gameTitle;

      var gameTeaserNode = document.createElement('img');
      gameTeaserNode.src = gameTeaser;
      gameTeaserNode.alt = '';

      h1Node.appendChild(gameTeaserNode);
      h1Node.appendChild(titleNode);

      target = redirectToBlank ? '_blank' : '_self';

      buttonContainerNode = document.createElement('div');
      buttonContainerNode.className = 'buttonContainer';

      buttonNode = document.createElement('a');
      buttonNode.className = 'cta';
      var cancelRedirectTimeout = function () {
        clearTimeout(redirectTimer);
      }
      // do both, doesn't harm
      buttonNode.addEventListener('touchend', cancelRedirectTimeout);
      buttonNode.addEventListener('click', cancelRedirectTimeout);

      buttonNode.setAttribute('href', getGameLink());
      buttonNode.setAttribute('target', target);
      buttonNode.innerHTML = 'Play';
      buttonContainerNode.appendChild(buttonNode);

      articleNode.appendChild(h1Node);
      articleNode.appendChild(buttonContainerNode);

      if (showWebmasterNotification) {
        infoNode = document.createElement('p');
        infoNode.className = 'info';
        infoNode.innerHTML = '<strong>@Webmasters:</strong> Please see the <a href="https://help.famobi.com/#use-games-in-an-iframe" target="_blank">Help section (&quot;I would like to use games in an iFrame - &hellip;&quot;).</a>';
        articleNode.appendChild(infoNode);

        if (affiliateId !== "A1000-1") {
          infoNode = document.createElement('p');
          infoNode.className = 'info';
          infoNode.innerHTML = 'Please make sure that our information is present in your <span style="font-weight: bold">/ads.txt</span> file, <a href="https://help.famobi.com/#\'ads.txt\'-What-is-it-and-why-do-i-need-it?" target="_blank">see more details in this help section (&quot;\'ads.txt\' What is it and why do i need it?&quot;).</a> You will be forwarded in a few seconds&hellip;';
          articleNode.appendChild(infoNode);
        }
      }

      fgAppsNode.appendChild(articleNode);
      bodyNode.appendChild(fgAppsNode);
    }
    ;

  // Use dataLayer variables
  famobi_dataLayer.push({
    'packageId': packageId,
    'affiliateId': affiliateId,
    'section': 'pregame'
  });



  function initRedirect(url) {

    // @TODO  make a business case with google for adx for games inside webview
    if (["A-TDOHN", "A-DOT38"].indexOf(affiliateId) > -1) {
      // CTR policy violation
      redirectToBlank = true;
      showWebmasterNotification = true;
      affiliateId = "A1000-11";
    }

    if (document.referrer.indexOf("game01.ru") !== -1 ||
      document.referrer.indexOf("friv1.net") !== -1 ||
      document.referrer.indexOf("dutchycorp.space") !== -1) {
      // Violating content
      redirectToBlank = true;
      showWebmasterNotification = true;
      affiliateId = "A1000-11";
    }

    if (isInsideFrame && JSON.parse(preventIFrame)) {
      redirectToBlank = true;
    }

    // redirect poki/gamesys traffic to default affiliate (until case solved)
    if (["A-GAMESYS"].indexOf(affiliateId) > -1) {
      affiliateId = "A1000-11";
      window.location.replace(getGameLink());
      return;
    }

    // redirect part of traffic to afg beta versions
    if ((["solitaire-classic", "table-tennis-world-tour", "perfect-piano"].indexOf(packageId) > -1)
      && (["A-AFGBETA",
        "A-DENDAAPP",
        "A-TOS21",
        "A-GAME8-AFG",
        "A-HUAWEIAPP",
        "A-HUAWEI-QUICKAPPS",
        "A-HUAWEI-BROWSER",
        "A-HUAWEI-QUICKAPP-OMNOM",
        "A-HUAWEI-BROWSER-OMNOM",
        "A-GOLLERCEPTE",
        "A-SPORX",
        "A-KBCBANK",
        "A-MINESKIGAMES",
        "A-MINESKIGAMES-DEV",
        "A-CK67R",
        "A-TIKTOK"].indexOf(affiliateId) < 0)
      && !JSON.parse(isAffiliateUrl)
      && portalParams.ad_ingame
      && Math.random() < 0.2) {
      var urlParams = '?original_aid=' + encodeURIComponent(affiliateId);
      affiliateId = "A-AFGBETA";
      window.location.replace(getGameLink() + urlParams);
      return;
    }

    if (redirectToBlank) {
      if (affiliateId === "A1000-1" && !JSON.parse(preventIFrame)) {
        affiliateId = "A1000-11";
      }
      getHTML();
      redirectTimer = setTimeout(function () {
        window.top.location = getGameLink();
      }, 15E3);
    } else {
      incrHit(function () {
        window.location.replace(url);
      });
    }
  }

  function incrHit(callback) {
    var newImg = document.createElement('img');
    newImg.src = '/play/hit/' + gameId + '/' + affiliateId;
    newImg.setAttribute('width', "1");
    newImg.setAttribute('height', "1");

    function trackWithGoogleAndContinue() {
      setTimeout(callback, 250);
    }

    if (typeof callback == "function") {
      newImg.onload = trackWithGoogleAndContinue;
      newImg.onerror = trackWithGoogleAndContinue;
    }
    body.appendChild(newImg);
  }

  initRedirect(getLinkToGame());
})();