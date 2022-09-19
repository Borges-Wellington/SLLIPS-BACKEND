const database = require("../../database/connection");

class tipoTurismo {
  getTipoTurismo(request, response) {
    const dados = request.params
    console.log(dados.idcidade);
    database
    .raw(
        "select " +
        "'lazer' as turismo,  " +
        "count(*) as npessoas, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'LAZER' and p.Sexo = 1 " +
        ") as homens, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'LAZER' and p.Sexo = 2 " +
        ") as mulher, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'LAZER' and p.Sexo = 1 " +
        ") as outros, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -365 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -720 DAY) >= checkin and adddate(now(), INTERVAL -365 DAY) <= checkout " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescAnual, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -30 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -60 DAY) >= checkin and adddate(now(), INTERVAL -30 DAY) <= checkout " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescMensal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -7 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -14 DAY) >= checkin and adddate(now(), INTERVAL -7 DAY) <= checkout " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescSemanal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where now() >= checkin and now() <= checkin " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -1 DAY) >= checkin and adddate(now(), INTERVAL -1 DAY) <= checkin " +
        "	and t.NomeTipo = 'LAZER' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescDiario " +
        "from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and t.NomeTipo = 'LAZER' " +
        "union all " +
        "select  " +
        "'religioso' as turismo,  " +
        "count(*) as npessoas, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'RELIGIOSO' and p.Sexo = 1 " +
        ") as homens, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'RELIGIOSO' and p.Sexo = 2 " +
        ") as mulher, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'RELIGIOSO' and p.Sexo = 1 " +
        ") as outros, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -365 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -720 DAY) >= checkin and adddate(now(), INTERVAL -365 DAY) <= checkout " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescAnual, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -30 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -60 DAY) >= checkin and adddate(now(), INTERVAL -30 DAY) <= checkout " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescMensal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -7 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -14 DAY) >= checkin and adddate(now(), INTERVAL -7 DAY) <= checkout " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescSemanal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where now() >= checkin and now() <= checkin " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -1 DAY) >= checkin and adddate(now(), INTERVAL -1 DAY) <= checkin " +
        "	and t.NomeTipo = 'RELIGIOSO' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescDiario " +
        "from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and t.NomeTipo = 'RELIGIOSO' " +
        "union all " +
        "select   " +
        "'saude' as turismo, " +  
        "count(*) as npessoas, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'SAUDE' and p.Sexo = 1 " +
        ") as homens, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'SAUDE' and p.Sexo = 2 " +
        ") as mulher, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'SAUDE' and p.Sexo = 1 " +
        ") as outros, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -365 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -720 DAY) >= checkin and adddate(now(), INTERVAL -365 DAY) <= checkout " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescAnual, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -30 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -60 DAY) >= checkin and adddate(now(), INTERVAL -30 DAY) <= checkout " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescMensal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -7 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -14 DAY) >= checkin and adddate(now(), INTERVAL -7 DAY) <= checkout " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescSemanal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where now() >= checkin and now() <= checkin " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -1 DAY) >= checkin and adddate(now(), INTERVAL -1 DAY) <= checkin " +
        "	and t.NomeTipo = 'SAUDE' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescDiario " +
        "from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and t.NomeTipo = 'SAUDE' " +
        "union all " +
        "select  " +
        "'negocio' as turismo,  " +
        "count(*) as npessoas, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'NEGOCIO' and p.Sexo = 1 " +
        ") as homens, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'NEGOCIO' and p.Sexo = 2 " +
        ") as mulher, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'NEGOCIO' and p.Sexo = 1 " +
        ") as outros, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -365 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -720 DAY) >= checkin and adddate(now(), INTERVAL -365 DAY) <= checkout " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescAnual, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -30 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -60 DAY) >= checkin and adddate(now(), INTERVAL -30 DAY) <= checkout " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescMensal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -7 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -14 DAY) >= checkin and adddate(now(), INTERVAL -7 DAY) <= checkout " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescSemanal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where now() >= checkin and now() <= checkin " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -1 DAY) >= checkin and adddate(now(), INTERVAL -1 DAY) <= checkin " +
        "	and t.NomeTipo = 'NEGOCIO' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescDiario " +
        "from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and t.NomeTipo = 'NEGOCIO' " +
        "union all " +
        "select  " +
        "'outros' as turismo,  " +
        "count(*) as npessoas, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'OUTROS' and p.Sexo = 1 " +
        ") as homens, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'OUTROS' and p.Sexo = 2 " +
        ") as mulher, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and t.NomeTipo = 'OUTROS' and p.Sexo = 1 " +
        ") as outros, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -365 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -720 DAY) >= checkin and adddate(now(), INTERVAL -365 DAY) <= checkout " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescAnual, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -30 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -60 DAY) >= checkin and adddate(now(), INTERVAL -30 DAY) <= checkout " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescMensal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -7 DAY) >= checkin and now() <= Checkout " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -14 DAY) >= checkin and adddate(now(), INTERVAL -7 DAY) <= checkout " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	) " +
        ") as crescSemanal, " +
        "( " +
        "	select( " +
        "	( " +
        "	select count(*) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where now() >= checkin and now() <= checkin " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	) *100) /  " +
        "	( " +
        "	select if(count(*)=0,1,count(*)) from viagem v  " +
        "	inner join tipo t on v.TipoID = t.TipoID " +
        "	where adddate(now(), INTERVAL -1 DAY) >= checkin and adddate(now(), INTERVAL -1 DAY) <= checkin " +
        "	and t.NomeTipo = 'OUTROS' and CidadeIDDestino = ? " +
        "	)  " +
        ") as crescDiario " +
        "from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "and t.NomeTipo = 'OUTROS' " +
        "union all " +
        "select  " +
        "'TOTAL' as turismo,  " +
        "count(*) as npessoas, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and p.Sexo = 1 " +
        ") as homens, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and p.Sexo = 2 " +
        ") as mulher, " +
        "(	 " +
        "	select count(*) from usuario u  " +
        "    inner join viagem v on v.UsuarioID = u.UsuarioID  " +
        "    inner join pessoa p on p.PessoaID = u.PessoaID " +
        "    inner join tipo t on v.TipoID = t.TipoID " +
        "    where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? " +
        "	and p.Sexo = 1 " +
        ") as outros, " +
        "0 as crescAnual, " +
        "0 as crescMensal, " +
        "0 as crescSemanal, " +
        "0 as crescDiario " +
        "from usuario  u  " +
        "inner join viagem v on v.UsuarioID = u.UsuarioID " +
        "inner join pessoa p on p.PessoaID = u.PessoaID " +
        "inner join tipo t on v.TipoID = t.TipoID " +
        "where now() >= Checkin and now() <= Checkout and CidadeIDDestino = ? ", 
        [
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade,
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade,
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade,
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade,
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade,
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade,
            dados.idcidade, dados.idcidade, dados.idcidade, dados.idcidade
        ]
    )
    .then((retorno) => {
        console.log("Numero: ");
        console.log(retorno[0]);
        response.json(retorno[0]);
    })
    .catch((error) => {
        console.log(error);
    });
  }
}

module.exports = new tipoTurismo();