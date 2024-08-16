// Toggle class menu
$(function () {
  $('.menu').on('click', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.ss-menu1').addClass('visible1');
      $('.ss-menu2').addClass('visible2');
      $('.ss-menu3').addClass('visible3');
      $('.ss-menu4').addClass('visible4');
      $('.ss-menu5').addClass('visible5');
    } else {
      $('.ss-menu1').removeClass('visible1');
      $('.ss-menu2').removeClass('visible2');
      $('.ss-menu3').removeClass('visible3');
      $('.ss-menu4').removeClass('visible4');
      $('.ss-menu5').removeClass('visible5');
    }
  });
});

$(function () {
  $('.ss-menu').on('click', function () {
    $('.menu').removeClass('active');
    $('.ss-menu1').removeClass('visible1');
    $('.ss-menu2').removeClass('visible2');
    $('.ss-menu3').removeClass('visible3');
    $('.ss-menu4').removeClass('visible4');
    $('.ss-menu5').removeClass('visible5');
  });
});

$(function () {
  $(window).on('scroll', function () {
    if ($('.menu').hasClass('active')) {
      $('.menu').removeClass('active');
      $('.ss-menu1').removeClass('visible1');
      $('.ss-menu2').removeClass('visible2');
      $('.ss-menu3').removeClass('visible3');
      $('.ss-menu4').removeClass('visible4');
      $('.ss-menu5').removeClass('visible5');
    }
  });
});

// Parallax effect and gsap
$(function () {
  if (!window.location.pathname.match('mentions')) {
    $('.rellax').css('transform', 'translateX(-50%)');
    var rellax = new Rellax('.rellax');
  }
});

// Script for Email
window.addEventListener('load', function () {
  if (document.getElementById('insertMail')) {
    let name = 'contact';
    let domain = 'yourbandname.com';
    let divMail = document.getElementById('insertMail');
    let newAhref = document.createElement('a');
    newAhref.href = 'mailto:' + name + '@' + domain;
    newAhref.innerHTML = name + '@' + domain;
    divMail.appendChild(newAhref);
  }
});

// Manage video
$(function () {
  $('video').on('click', function (event) {
    event.preventDefault();
    document.getElementById('tucoVideo').play();
  });
});

// Manage form
$(function () {
  $('#nom').on('blur input', function () {
    if ($('#nom').val().length >= 50) {
      $('#helpNom').text('50 characters max').hide().show();
    } else {
      $('#helpNom').slideUp(400);
    }
  });
  $('#telephone').on('blur input', function () {
    let regexTelephone = /[0]{1}[1-7]{1}[0-9]{8}/;
    let telEntry = String(document.getElementById('telephone').value).replace(
      / /g,
      ''
    );
    if (!telEntry.match(regexTelephone)) {
      $('#helpTel').text('Incorrect phone number').hide().show();
    } else {
      $('#helpTel').slideUp(400);
    }
  });
  $('#mail').on('blur input', function () {
    let regexMail =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let mailEntry = $('input#mail').val();
    if (!mailEntry.match(regexMail)) {
      $('#helpMail').text('Incorrect email address').hide().show();
    } else {
      $('#helpMail').slideUp(400);
    }
  });
  $('#checkRobot').on('blur input', function () {
    if ($('#checkRobot').val() != 7) {
      $('#helpRobot').text('Incorrect result of the operation').hide().show();
    } else {
      $('#helpRobot').slideUp(400);
    }
  });
  $('#message').on('blur input', function () {
    if ($('#message').val().length >= 3000) {
      $('#helpMessage')
        .text('Your message must not exceed 3000 characters')
        .hide()
        .slideDown(400);
    } else {
      $('#helpMessage').slideUp(400);
    }
  });
});

// Contact form
$(function () {
  $('.contactForm').on('submit', function (e) {
    e.preventDefault();
    let nom = $('#nom').val();
    let telephone = $('#telephone').val();
    let mail = $('#mail').val();
    let message = $('#message').val();
    let newsletter = $('input[name="newsletter"]:checked').val();
    let checkRobot = $('#checkRobot').val();
    if ($('#checkRobot').val() == 7) {
      $.post(
        '../datas/sendFormContact.php',
        {
          nom: nom,
          telephone: telephone,
          mail: mail,
          message: message,
          newsletter: newsletter,
          checkRobot: checkRobot,
        },
        function (data, textStatus, xhr) {
          $('form').fadeOut(400, function () {
            $('#retourFormulaire').css({
              padding: '10px',
              'margin-top': '160px',
              'margin-bottom': '160px',
              'margin-left': 'auto',
              'margin-right': 'auto',
              color: 'white',
              'font-size': '1rem',
              'text-align': 'center',
            });
            $('#retourFormulaire').html(data);
          });
          $('#nom').val('');
          $('#telephone').val('');
          $('#mail').val('');
          $('#message').val('');
          $('#checkRobot').val('');
        }
      );
    } else {
      alert('Incorrect anti robot check result !');
    }
  });
});

// Newsletter form validation
$(function () {
  let regexMail =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  $('#emailNews').on('blur input', function (event) {
    let mailEntry = $('#emailNews').val();
    if (!mailEntry.match(regexMail)) {
      $('#helpMailNews').text('Incorrect email address').hide().show();
      $('#hideNews').hide();
    } else {
      $('#helpMailNews').slideUp(100, function () {
        $('#hideNews').fadeIn();
      });
    }
  });
  $('#checkRobotNews').on('blur input', function (event) {
    if ($('#checkRobotNews').val() != 7) {
      $('#helpMailNews').text('Incorrect result').hide().show();
    } else {
      $('#helpMailNews').slideUp(100);
    }
  });
});

// Newsletter form ajax submission
$(function () {
  $('.newsletterForm').on('submit', function (e) {
    e.preventDefault();
    let mail = $('#emailNews').val();
    let checkRobot = $('#checkRobotNews').val();
    if ($('#checkRobotNews').val() == 7) {
      $.post(
        '../datas/sendFormSubscription.php',
        {
          mail: mail,
          checkRobot: checkRobot,
        },
        function (data, textStatus, xhr) {
          $('.newsletterForm').fadeOut(400, function () {
            $('#retourNewsFormulaire').css({
              padding: '10px',
              'margin-top': '60px',
              'margin-bottom': '60px',
              'margin-left': 'auto',
              'margin-right': 'auto',
              color: 'white',
              'font-size': '1rem',
              'text-align': 'center',
            });
            $('#retourNewsFormulaire').html(data);
          });
          $('#emailNews').val('');
          $('#checkRobotNews').val('');
        }
      );
    } else {
      alert('Incorrect anti robot check result !');
    }
  });
});

// Animations on scroll
$(function () {
  $(window).on('scroll', function () {
    let sizePage = $(window).height();
    let trigger = 100;
    let element = document.getElementsByClassName('animatableY');
    for (var unit of element) {
      if (unit.getBoundingClientRect().top + trigger <= sizePage) {
        unit.classList.add('showed');
      }
    }

    let elementh2 = document.getElementsByClassName('animatableX');
    for (var unit of elementh2) {
      if (unit.getBoundingClientRect().top + trigger <= sizePage) {
        unit.classList.add('showed');
      }
    }

    let elementOpacity = document.getElementsByClassName('animatableOpacity');
    for (var unit of elementOpacity) {
      if (unit.getBoundingClientRect().top + trigger <= sizePage) {
        unit.classList.add('showed');
      }
    }
  });
});

// Lazyload
$(function () {
  if (!window.location.pathname.match('mentions')) {
    lazyload();
  }
});

// Resize reload
$(function () {
  let initialWidth = $(window).innerWidth();
  $(window).on('resize', function () {
    let newWidth = $(window).innerWidth();
    if (initialWidth != newWidth) {
      document.location.reload(true);
    }
  });
});

// Manage scroll up button
$(function () {
  let ecran =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  $(window).on('scroll', function () {
    let scrollNow = $(window).scrollTop();
    $(window).on('scroll', function () {
      if (scrollNow > 600 && scrollNow > $(window).scrollTop()) {
        if ($('#upArrow').is(':hidden')) {
          $('#upArrow').show();
        }
      } else {
        $('#upArrow').hide();
      }
    });
    $('#upArrow').on('click', function () {
      $(window).scrollTop(0);
    });
  });
});

// Delete scroll tag on scroll down
$(function () {
  $(window).on('scroll', function () {
    let topPage = $(window).scrollTop();
    if (topPage >= 150) {
      $('#scrollDown').hide();
    } else {
      $('#scrollDown').show();
    }
  });
});

// Manage tag scroll down
$(function () {
  $('#scrollDown').on('click', function () {
    window.location.href = '#nextShow';
  });
});

// Locations
$(function () {
  $('.card').on('click', () => {
    window.location.href = 'https://www.instagram.com/';
  });
});

// Location socials
$(function () {
  $('.facebook').on('click', function (event) {
    event.preventDefault();
    window.location.href = 'https://facebook.com/';
  });
  $('.instagram').on('click', function (event) {
    event.preventDefault();
    window.location.href = 'https://www.instagram.com/';
  });
});
async function fetchShows() {
  const response = await fetch(
    'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clzqt8fzp04cf07v1yw5em51n/master?',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
              query MyQuery {
                  shows(orderBy: dateAndTime_ASC) {
                      location
                      locationName
                      dateAndTime
                  }
              }`,
      }),
    }
  );

  const data = await response.json();

  if (data.data && data.data.shows && data.data.shows.length > 0) {
    const shows = data.data.shows;

    // Filter out shows that are in the past
    const upcomingShows = shows.filter((show) => {
      const showDate = new Date(show.dateAndTime);
      const currentDate = new Date();
      return showDate >= currentDate;
    });

    if (upcomingShows.length > 0) {
      // Display the next show
      const nextShow = upcomingShows[0];
      const nextShowDate = new Date(nextShow.dateAndTime).toLocaleDateString(
        'en-US',
        {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }
      );
      const nextShowDetails = `${nextShowDate} | ${nextShow.locationName} - ${nextShow.location}`;
      document.getElementById('nextShowDetails').textContent = nextShowDetails;

      // Display the list of shows
      const showsTable = document.getElementById('showsTable');
      upcomingShows.forEach((show) => {
        const showDate = new Date(show.dateAndTime).toLocaleDateString(
          'en-US',
          {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }
        );
        const showTime = new Date(show.dateAndTime).toLocaleTimeString(
          'en-US',
          {
            hour: '2-digit',
            minute: '2-digit',
          }
        );

        const row = document.createElement('tr');
        row.classList.add('animatableY');
        row.innerHTML = `
          <td>${showDate}</td>
          <td>
            <span class="white"><a href="#">${show.locationName}</a></span><br />
            ${show.location}
          </td>
          <td>${showTime}</td>
        `;

        showsTable.appendChild(row);
      });
    } else {
      document.getElementById('nextShowDetails').textContent =
        'No upcoming shows.';
      const showsTable = document.getElementById('showsTable');
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="3">No upcoming shows available.</td>`;
      showsTable.appendChild(row);
    }
  } else {
    document.getElementById('nextShowDetails').textContent =
      'No upcoming shows.';
    const showsTable = document.getElementById('showsTable');
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="3">No upcoming shows available.</td>`;
    showsTable.appendChild(row);
  }
}

// Call the function to fetch and display the shows
fetchShows();
