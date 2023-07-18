<!DOCTYPE html>
<html>
<head>
    <title>Validar Colchetes</title>
</head>
<body>
    <form method="POST" action="{{ route('validar-colchetes.validar') }}">
        @csrf
        <textarea name="string" placeholder="Digite a string"></textarea> <br />
        <button type="submit">Validar</button>
    </form>
</body>
</html>
