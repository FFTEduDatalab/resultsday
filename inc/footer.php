  <div class="section" id="report-banner">
    <div class="container">
      <div class="row center">
        <div class="col s12">
			<h5>Spot something wrong? <a href="mailto:philip.nye@fft.org.uk?subject=Results feedback">Let us know</a></h5>
		</div>
      </div>
    </div>
  </div>
  <footer class="page-footer grey darken-1">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">About</h5>
          <p class="grey-text text-lighten-4">Built by FFT Education Datalab, part of FFT.</p>
		  <p class="grey-text text-lighten-4">Funded by the Nuffield Foundation.</p>
		  <p><a href="about.php" class="white lighten-1 blue-text waves-effect btn-flat">Find out more</a></p>
        </div>
        <div class="col l6 s12 push-l2">
          <h5 class="white-text">Links</h5>
          <ul>
            <li><a class="white-text" href="https://ffteducationdatalab.org.uk">FFT Education Datalab</a></li>
            <li><a class="white-text" href="https://twitter.com/FFTEduDatalab">@FFTEduDatalab</a></li>
            <li><a class="white-text" href="http://www.nuffieldfoundation.org/">Nuffield Foundation</a></li>
            <li><a class="white-text" href="https://twitter.com/nuffieldfound">@NuffieldFound</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
		<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
      	<a class="white-text" href="https://fft.org.uk/privacy-policy">Privacy</a> &middot; <a class="white-text" href="https://fft.org.uk/cookie-policy">Cookies</a>
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>
	<script>
		$(function(){
		  // bind change event to select
		  $('#subject-dropdown').on('change', function () {
			  var url = $(this).val(); // get selected value
			  if (url) { // require a URL
				  window.location = url; // redirect
			  }
			  return false;
		  });
		});
	</script>
	<script>
		runScripts();
	</script>
  </body>
</html>
