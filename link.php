<ul>
	<li><a href='index.php?content=algemeneHomepage'>Home</a></li>
	<li><a href='http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/contact.html'>Contact</a></li>

    <?php
	if (isset($_SESSION['userrole']))
	{
		echo "<li><a href='index.php?content=logout'>Uitloggen</a></li>";

		switch ($_SESSION['userrole'])
		{
			case "developer":
				echo "<li id='jquery' class='jquerytut'>
						<b>JQuery Tutorial</b>
					 </li>
					 <div class='jquerytoggle'>
					 <li><a href='index.php?content=developer/JQuery/get_started'>get started</a></li>
					 <li><a href='index.php?content=developer/JQuery/syntax'>syntax</a></li>
					 <li><a href='index.php?content=developer/JQuery/events'>events</a></li>
					 <li><a href='index.php?content=developer/JQuery/hideshow'>hide show</a></li>
					 <li><a href='index.php?content=developer/JQuery/fade'>fade</a></li>
					 <li><a href='index.php?content=developer/JQuery/slide'>slide</a></li>
					 <li><a href='index.php?content=developer/JQuery/animate'>animate</a></li>
					 <li><a href='index.php?content=developer/JQuery/css'>css</a></li>
					 <li><a href='index.php?content=developer/JQuery/ancectors'>ancectors</a></li>
					 <li><a href='index.php?content=developer/JQuery/children'>children</a></li>
  					 <li><a href='index.php?content=developer/JQuery/siblings'>siblings</a></li>
					 <li><a href='index.php?content=developer/JQuery/first'>first</a></li>
					 </div>
						<li id='csskop'><b>JSon</b></li>
						<li><a href='index.php?content=developer/toets/JSonTest'>jsontest</a></li>

						<li id='csskop'><b>Ajax</b></li>
						<li><a href='index.php?content=developer/toets/ajax_foto'>ajax_foto</a></li>
						<li><a href='index.php?content=developer/toets/ajax_create'>ajax_create</a></li>
						<li><a href='index.php?content=developer/toets/ajax_todo_toets'>ajaxtoetstodo</a></li>

						<li id='csskop' class='jquerytoets'><b>JS Tutorial</b></li>
						<div class='javascriptlink'>
						<li><a href='index.php?content=developer/toets/Jshome'>Js home</a></li>
						<li><a href='index.php?content=developer/toets/Jsintroduction'>Js introduction</a></li>
						<li><a href='index.php?content=developer/toets/Jswhereto'>Js where to</a></li>
						<li><a href='index.php?content=developer/toets/Jsoutput'>Js output</a></li>
						<li><a href='index.php?content=developer/toets/Jssyntax'>Js syntax</a></li>
						<li><a href='index.php?content=developer/toets/Jsstatements'>Js statements</a></li>
						<li><a href='index.php?content=developer/toets/Jscomments'>Js comments</a></li>
						<li><a href='index.php?content=developer/toets/Jsvariabeles'>Js variabeles</a></li>
						<li><a href='index.php?content=developer/toets/Jsoperators'>Js operators</a></li>
						<li><a href='index.php?content=developer/toets/Jsarithemic'>Js arithemetic</a></li>
						<li><a href='index.php?content=developer/toets/ajax'>Js ajax</a></li>
						<li><a href='index.php?content=developer/toets/javascriptobjecten'>javaobjecten</a></li>
						<li><a href='index.php?content=developer/toets/ajaxtoetstien'>ajaxtoetstien</a></li>
						</div>
						<br>
						<a href='index.php?content=developer/arrays'>
							tutorial array
						</a>
					 </li>
					 <li id='csskop'><b>CSS</b></li>
					 <div class='outer-container'>
					 <li>
						<ul>
							<li><a href='index.php?content=developer/css/toetscss'>toetscss</a></li>
							<li><a href='index.php?content=developer/css/syntax'>syntax</a></li>
							<li><a href='index.php?content=developer/css/selectors'>selectors</a></li>
							<li><a href='index.php?content=developer/css/howto'>how to</a></li>
							<li><a href='index.php?content=developer/css/background'>background</a></li>
							<li><a href='index.php?content=developer/css/csslink'>csslink</a></li>
							<li><a href='index.php?content=developer/css/text'>text</a></li>
							<li><a href='index.php?content=developer/css/font'>font</a></li>
							<li><a href='index.php?content=developer/css/table'>table</a></li>
							<li><a href='index.php?content=developer/css/boxmodel'>boxmodel</a></li>
							<li><a href='index.php?content=developer/css/outline'>outline</a></li>
							<li><a href='index.php?content=developer/css/margin'>margin</a></li>
							<li><a href='index.php?content=developer/css/padding'>padding</a></li>
							<li><a href='index.php?content=developer/css/dimensions'>dimensions</a></li>
							<li><a href='index.php?content=developer/css/display'>display</a></li>
							<li><a href='index.php?content=developer/css/positioning'>positioning</a></li>
							<li><a href='index.php?content=developer/css/z-index'>z-index</a></li>
							<li><a href='index.php?content=developer/css/floating'>floating</a></li>
							<li><a href='index.php?content=developer/css/align'>align</a></li>
							<li><a href='index.php?content=developer/css/combinators'>combinators</a></li>
							<li><a href='index.php?content=developer/css/pseudoclasses'>pseudoclasses</a></li>
							<li><a href='index.php?content=developer/css/pseudoelements'>pseudoelements</a></li>
							<li><a href='index.php?content=developer/css/opacity'>opacity</a></li>
							<li><a href='index.php?content=developer/css/shadows'>shadows</a></li>
							<li><a href='index.php?content=developer/css/tekst'>tekst</a></li>
							<li><a href='index.php?content=developer/css/2d-transforms'>2d-transforms</a></li>
							<li><a href='index.php?content=developer/css/animations'>animations</a></li>
							<li><a href='index.php?content=developer/css/multiple_columns'>multiple_columns</a></li><li><a href='index.php?content=developer/css/resisable'>resisable</a></li>
						</ul>
						</li>

						</div>";

			break;
			case "administrator":
				echo "<li><a href=''></a></li>";
			break;
			case "root":
				echo "<li><a href=''></a></li>";
                break;
			case "customer":
				echo "<li><a href='index.php?content=klachtaanmaken'>Klacht aanmaken</a></li>";
                echo "<li><a href='index.php?content=klachtview'>Klachten bekijken</a></li>";
				echo "<li><a href='index.php?content=wijzig_wachtwoord'>Wachtwoord wijzigen</a></li>";
                echo "<li><a href='index.php?content=orderview'>Orders bekijken</a></li>";
                echo "<li><a href='index.php?content=favoritesview'>Favorieten bekijken</a></li>";

			break;
			case "photographer":
				echo "<li><a href=''></a></li>";
			break;
            case "zaalbeheerder":
                echo "<li><a href='index.php?content=complaintsview'>Openstaande klachten afhandelen</a></li>";
                echo "<li><a href='index.php?content=artikelvandedag'>Artikel van de dag kiezen</a></li>";
		}
	}
	else
	{
	echo "
		<li><a href='index.php?content=OfMice&Men'>Of Mice & men</a></li>
		<li><a href='index.php?content=register_form'>registreren</a></li>
		<li><a href='index.php?content=Login_form'>inloggen</a></li>";
	}
    ?>
</ul>
<script>
	$(document).ready(function(){
		$(".javascriptlink").hide();
		$(".jquerytoets").click(function(){
			$(".javascriptlink").slideToggle();
			$(".javascriptlink a:even").css("color","green");
			$(".javascriptlink a:odd").css("color","purple");
		});
		$(".jquerytoggle").hide();
		$(".jquerytut").click(function(){
			$(".jquerytoggle").slideToggle();
			$(".jquerytoggle a:even").css("color","green");
			$(".jquerytoggle a:odd").css("color","purple");
		});
	});
</script>